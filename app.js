// const fs = require('fs');

// fs.appendFileSync('notes.txt', 'data to append');

// const chalk = require('chalk')

// console.log(chalk.green('Success!...'))

const { demandOption, command } = require('yargs')
const yargs = require('yargs')

yargs.version('1.1.0')


const allNotes = require('./notes.js')




//commands to run on terminal 
// 1. node app.js --help(for this console.log(yargs.argv)/yargs.parse()...is necessary and it should be written below only)
// 2. node app.js add

yargs.command(
    {
        command: 'add',
        describe: 'Can Add a new note',
        builder: {
            title: {
                describe: 'Note Title',
                demandOption: true,
                type: 'string'
            },
            body: {
                describe: "Notes body",
                demandOption: "true",
                type: 'string'
            }
        },
        // handler : function(argv){
        //    allNotes.addNotes(argv.title, argv.body)
        // }
        handler(argv) {
            allNotes.addNotes(argv.title, argv.body)
        }
    }
)

yargs.command(
    {
        command: 'remove',
        describe: 'Can remove an existing note',
        builder: {
            title: {
                describe: 'remove note',
                demandOption: true,
                type: 'string'
            },
        },
        handler(argv) {
            allNotes.removeNote(argv.title)
            // console.log(argv.title)
        }
    }
)

yargs.command(
    {
        command: 'read',
        describe: 'Can read an existing note',
        builder: {
            title: {
                describe: 'note title',
                demandOption: true,
                type: 'string'

            }
        },
        handler(argv) {
            allNotes.readNote(argv.title)
        }
    }
)

yargs.command(
    {
        command: 'list',
        describe: 'Can show all notes',
        handler() {
            allNotes.listNotes()
        }
    }
)


yargs.parse()
