import path from 'path';
import fs from 'fs';
import browserify from 'browserify';
import babelify from 'babelify';
import browserSync from 'browser-sync';

import { frequencyExercises } from '../lib/data';

const bs = browserSync.create();

export default class Server {
    constructor(port, submissionPath, currentExercise) {
        this.port = port;
        this.submissionPath = submissionPath;
        this.currentExercise = currentExercise;

        const isFrequencyExercice = frequencyExercises.indexOf(this.currentExercise) !== -1;
        const entryFile = isFrequencyExercice ? 'main-frequencies.js': 'main-numbers.js';

        this.basepath = path.join(__dirname, '..', 'static');
        this.copyPath = path.join(__dirname, '..', 'static', 'submission.js');
        this.entryPath = path.join(__dirname, '..', 'static', entryFile);
        this.outputPath = path.join(__dirname, '..', 'static', 'bundle.js');
    }

    copySubmission(file, cb) {
        fs.readFile(file, {encoding: 'utf-8'}, (error, content) => {
            fs.writeFile(this.copyPath, content, cb);
        });
    }

    watch() {
        bs.watch(this.submissionPath, () => {
            this.copySubmission(this.submissionPath, this.bundleFiles.bind(this));
        });
    }

    bundleFiles() {
        const bundler = browserify([this.entryPath], {
            cache: {},
            transform: [babelify],
            packageCache: {},
            debug: true,
            fullPaths: true,
        });

        process.stdout.write('Loading your solution... ');

        bundler.bundle((err, js) => {
            fs.writeFile(this.outputPath, js, (error) => {
                if (error) {
                    console.log(error);
                }

                console.log('done!');

                if (!bs.active) {
                    this.start();
                } else if (!err && !error) {
                    bs.reload();
                }

            });

        })
        .on('error', function handleError(err) {
            console.log(err.codeFrame);
            bs.notify(err.message, 10000);
        })
    }

    start() {

        bs.init({
            server: this.basepath,
            port: this.port,
            ui: false,
            logLevel: 'silent',
        });

        console.log(`Point your browser to http://localhost:${this.port}/`);

        bs.watch();
    }
}
