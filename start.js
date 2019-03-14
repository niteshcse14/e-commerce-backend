'use-strict'
require('colors');
require('babel-register');
require('colors')
require('dotenv').config();
const cluster = require('cluster');
const clitable = require('cli-table');
const os = require('os');
const qrcode = require('qrcode-terminal');
class LocalAppCluster {
	constructor(workerPerCore, appFile, appName) {
		this.workerPerCore = workerPerCore;
		this.appFile = appFile;
		this.appName = appName;
		this.numCpu = os.cpus().length;
		this.numWorkers = Math.ceil(this.numCpu * this.workerPerCore);
		this.pending = this.numWorkers;
		this.workers = [];
		this.reFork = true;
		this.forkResetTimeout = null;
		this.gracefullShutdown = false;
		this.generateMachineId.bind(this),
			this.getVisualizationSticker.bind(this);
			this.initSticker.bind(this);
			this.forkWorker.bind(this);
			this.launchSubCluster.bind(this);
	}
	generateMachineId() {
		this.length = 64;
		try {
			this.machineId = crypto.randomBytes(this.length).toString('hex');
		} catch (ex) {
			this.machineId = crypto.pseudoRandomBytes(this.length).toString('hex');
		}
	}
	//print Init sticker
	
	initSticker() {
		if (cluster.isMaster) return;
		console.log('\nStarting...'.yellow.bold);
		console.log('\nInitializing physical machine:'.magenta, this.machineId.green.bold);
		console.log('\n  MACHINE ID FOOTPRINT');
		console.log(this.getVisualizationSticker(this.machineId));
		console.log('\nMaster PID:', process.pid);
	};
	
	/*
	* Launch the sub cluster on this physical machine
	* */
	launchSubCluster () {
		if (cluster.isMaster) {
			//prepare config clitable
			this.configclitable = new clitable({ head: ['', 'Value']});
			this.configclitable.push(
				{'PROCESS PID': [process.pid]},
				{'NUMBER OF CPUs': [this.numCpu]},
				{'NUMBER OF WORKERS PER CPU': [this.workerPerCore]},
				{'NUMBER OF WORKERS TRIGGERED': [this.numWorkers]}
			);
			console.log("\nCONFIGURATIONS".underline.bold.green);
			console.log(this.configclitable.toString());
			
			//Launch workers
			for (var idx = 0; idx < this.numWorkers; ++idx) {
				this.forkWorker();
			}
		} else {
			console.log("\n[System] Loading Worker...", process.pid);
			//Add Graceful control helper methods for worker
			global._enableGracefulShutDownMode = function () {
				if (process.send) {
					process.send({type: 'enable-graceful-shutdown'});
				} else {
					console.log("[SUBSYSTEM ERROR] Cannot enable the graceful shutdown mode as IPC seems to be disables.".red.bold);
				}
			}
			global._disableGracefulShutDownMode = function () {
				if (process.send) {
					process.send({type: 'disable-graceful-shutdown'});
				} else {
					console.log("[SUBSYSTEM ERROR] Cannot enable the graceful shutdown mode as IPC seems to be disables.".red.bold);
				}
			}
			require(this.appFile);
		}
	}
	
	forkWorker() {
		var _self = this;
		this.worker = cluster.fork({'X-MACHINE-ID': this.machineId});
		//Bind Events
		this.worker
			.on("message", function (message) {
				if (message && message.type) {
					switch (message.type) {
						case "server-running":
							pending--;
							this.workers.push(message);
							if (!pending) {
								_self.workerclitable = new clitable({head: ['S.NO.', 'PID', 'ENVIRONMENT', 'PORT', 'URL', 'FILE', 'WORKER ID']});
								_self.workers.forEach(function (worker, idx) {
									_self.workerclitable.push([
										idx + 1,
										worker.pid,
										worker.env,
										workerl.port,
										worker.url,
										worker.file,
										worker.workerId
									]);
								});
							}
							break;
						case "enable-graceful-shutdown":
							this.gracefullShutdown = true;
							console.log('[SUBSYSTEM] Enabled graceful shutdown mode.'.blue.bold);
							break;
						case "disable-graceful-shutdown":
							this.gracefullShutdown = false;
							console.log('[SUBSYSTEM] Disabled graceful shutdown mode.'.blue.bold);
							//Restore dead workers as graceful is disabled
							if (cluster.workers.length < this.numWorkers) {
								console.log('[SUBSYSTEM REPAIR] Restoring dead workers:'.blue.bold, this.numWorkers - cluster.workers.length);
								for (var i = 0; i < (this.numWorkers - cluster.workers.length); i++) {
									this.forkWorker();
								}
							}
							break;
					}
				}
			})
			.on("fork", function () {
				console.log("[SYSTEM] Forked Worker...", _self.worker.process.pid);
			})
			.on("online", function () {
				console.log("[SYSTEM] Online Worker...", _self.worker.process.pid);
			})
			.on("exit", function (code, signal) {
				console.log("[SYSTEM] Worker Exited...", _self.worker.process.pid, code, signal);
				try {
					//
				} catch (ex) {
					console.log("Error saving crash report");
					console.log(ex);
				}
				if (this.gracefullShutdown) return;
				//ReFork a new one
				if (this.reFork) {
					this.reFork = false;
					clearTimeout(this.forkResetTimeout);
					this.forkResetTimeout = setTimeout(function () {
						this.reFork = true;
					}, 5000);
				} else {
					console.log("[SOMETHING NOT RIGHT] The worker restarted quickly, this is fishy. Not ReForking!".red.bold);
					this.reFork = true;
				}
			});
	}

	getVisualizationSticker(value, cols, scale) {
		cols = cols || 8;
		scale = scale || 2;

		var fingerPrint = '';

		//Add Header
		for (var i = 0; i < (cols * scale) + 8; i++) fingerPrint += ' '.red.inverse;
		fingerPrint += '\n';
		fingerPrint += '  '.red.inverse;
		for (i = 0; i < (cols * scale) + 4; i++) fingerPrint += ' ';
		fingerPrint += '  '.red.inverse;

		//Print footprint
		var numLines = Math.ceil(value.length / cols), probability = 50.00;
		for (i = 0; i < numLines; i++) {
			fingerPrint += '\n';
			fingerPrint += '  '.red.inverse;
			var string = ' ' + value.substr(i * cols, cols) + ' ';
			var exChars = scale - 1;
			for (var j = 0; j < string.length; j++) {
				fingerPrint += string.charAt(j).green;
				for (var k = 0; k < exChars; k++) {
					fingerPrint += string.charAt(string.length - j).blue;
				}
			}
			fingerPrint += ' ';
			fingerPrint += '  '.red.inverse;
			fingerPrint += ('  <-' + probability.toFixed(2) + '%').grey;
			probability = 100 - ((100 - probability) / 2);
		}

		//Add footer
		fingerPrint += '\n';
		fingerPrint += '  '.red.inverse;
		for (i = 0; i < (cols * scale) + 4; i++) fingerPrint += ' ';
		fingerPrint += '  '.red.inverse;
		fingerPrint += '\n';
		for (i = 0; i < (cols * scale) + 8; i++) fingerPrint += ' '.red.inverse;

		return fingerPrint;
	}
}
var NUMBER_OF_WORKERS_PER_CPU = 0.1;
var localAppCluster = new LocalAppCluster(NUMBER_OF_WORKERS_PER_CPU, './keystone.js', 'E-Commerce-Backend');
localAppCluster.launchSubCluster();
