const fs = require('fs')
const chalk = require('chalk')

const addNotes = (title, body) => {
  const notes = fetchNotes()
  // console.log(notes)

  //  const duplicateNote = notes.filter((note) => note.title === title  //if true then the object will be stored in duplicateNote array
  //  )

  const duplicateNote = notes.find((note) => note.title === title)

  // debugger //node inspect app.js add --title="S" --body"Bhil"

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body
    })

    saveNotes(notes)
    console.log('added')
  }

  else {

    console.log('note with same title already exist')
  }
}

const fetchNotes = () => {
  try {
    //   if json file exist from before
    const bufferedData = fs.readFileSync('notes.json')
    const JSONData = bufferedData.toString()
    const notes = JSON.parse(JSONData)
    return notes

  }
  catch (e) {
    //   if json file dors not exist will give error and come to catch and will return empty array
    return []
  }

}

const saveNotes = (notes) => {
  const JSONData = JSON.stringify(notes)
  fs.writeFileSync('notes.json', JSONData)
}

const removeNote = (title) => {
  // console.log("remove func of notes.js")
  const notes = fetchNotes()

  const duplicateNote = notes.filter((note) => note.title === title
  )

  if (duplicateNote.length === 0) {
    console.log(chalk.red.inverse("No Note Found"))
  }
  else {
    const nonDuplicateNote = notes.filter((note) => note.title !== title
    )
    saveNotes(nonDuplicateNote)
    console.log(chalk.green.inverse("Note Removed"))
  }
}

const listNotes = () => {
  console.log(chalk.blue("Your Notes:"))
  const notes = fetchNotes()
  notes.forEach((note) => console.log(note.title))
}

const readNote = (title) => {
  const notes = fetchNotes()
  const item = notes.find((note) => note.title === title)
  // console.log(item)
  if (item) {
    console.log(chalk.yellow.inverse(item.title))
    console.log(item.body)
  }
  else {
    console.log(chalk.red("Item not found"))
  }
}

module.exports = {
  addNotes: addNotes,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
}