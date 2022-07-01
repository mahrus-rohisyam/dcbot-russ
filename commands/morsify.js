// Morse Code source
// https://stackoverflow.com/questions/31128518/js-text-and-morse-code-converter

const textandmorse = [
  { letter: "A", morse: ".-" },
  { letter: "B", morse: "-..." },
  { letter: "C", morse: "-.-." },
  { letter: "D", morse: "-.." },
  { letter: "E", morse: "." },
  { letter: "F", morse: "..-." },
  { letter: "G", morse: "--." },
  { letter: "H", morse: "...." },
  { letter: "I", morse: ".." },
  { letter: "J", morse: ".---" },
  { letter: "K", morse: "-.-" },
  { letter: "L", morse: ".-.." },
  { letter: "M", morse: "--" },
  { letter: "N", morse: "-." },
  { letter: "O", morse: "---" },
  { letter: "P", morse: ".--." },
  { letter: "Q", morse: "--.-" },
  { letter: "R", morse: ".-." },
  { letter: "S", morse: "..." },
  { letter: "T", morse: "-" },
  { letter: "U", morse: "..-" },
  { letter: "V", morse: "...-" },
  { letter: "W", morse: ".--" },
  { letter: "X", morse: "-..-" },
  { letter: "Y", morse: "-.--" },
  { letter: "Z", morse: "--.." },
  { letter: "1", morse: ".----" },
  { letter: "2", morse: "..---" },
  { letter: "3", morse: "...--" },
  { letter: "4", morse: "....-" },
  { letter: "5", morse: "....." },
  { letter: "6", morse: "-...." },
  { letter: "7", morse: "--..." },
  { letter: "8", morse: "---.." },
  { letter: "9", morse: "----." },
  { letter: "0", morse: "-----" },
  { letter: ".", morse: ".-.-.-" },
  { letter: ",", morse: "--..--" },
  { letter: ":", morse: "---..." },
  { letter: "?", morse: "..--.." },
  { letter: "'", morse: ".----." },
  { letter: "-", morse: "-....-" },
  { letter: "/", morse: "-..-." },
  { letter: "(", morse: "-.--.-" },
  { letter: ")", morse: "-.--.-" },
  { letter: '"', morse: ".-..-." },
  { letter: "@", morse: ".--.-." },
  { letter: "=", morse: "-...-" },
  { letter: " ", morse: "/" },
];

const tidyText = (text) => {
  text = text.toUpperCase();
  text = text.trim();
  text = text.replace(/\s+/g, " ");
  return text;
};

tidyMorse = function (morse) {
  morse = morse.trim();
  morse = morse.replace(/\|/g, "/");
  morse = morse.replace(/\//g, " / ");
  morse = morse.replace(/\s+/g, " ");
  morse = morse.replace(/(\/ )+\//g, "/");
  morse = morse.replace(/^ \/ /, "");
  morse = morse.replace(/ \/ $/, "");
  morse = morse.replace(/_/g, "-");
  return morse;
};

tam = function (froml, log, type) {
  if (type === "t2m") {
    let from = tidyText(froml);
    let outm = "";
    for (i = 0; i < from.length; i++) {
      let from_character = from.charAt(i);
      for (j = 0; j < textandmorse.length; j++) {
        let letter = textandmorse[j].letter;
        let morse = textandmorse[j].morse;
        if (from_character === letter) {
          outm = outm + morse + " ";
        }
      }
    }
    return outm.substring(0, outm.length - 1);
  } else if (type === "m2t") {
    let from = tidyMorse(froml).replace(/\s+/g, "");
    let outm = "";

    let morseCodes = from.split("/");
    for (j = 0; j < morseCodes.length; j++) {
      for (i = 0; i < textandmorse.length; i++) {
        let morse = textandmorse[i].morse;
        if (morseCodes[j] == morse) {
          outm = outm + textandmorse[i].letter;
          break;
        }
      }
    }
    return outm;
  }
};

const isMorse = (input) => {
  input = tidyMorse(input);
  if (input.match(/^[ /.-]*$/)) {
    return true;
  } else {
    return false;
  }
};
let otext = ''
const morsingCode = (itext) => {
  if (isMorse(itext) === true) {
    let res = tam(itext, true, "m2t");
    otext.text(res);
  } else {
    let res = tam(itext, true, "t2m");
    return (otext = res);
  }
};

const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("morsify")
    .setDescription("Information about the options provided.")
    .addStringOption((option) =>
      option.setName("input").setDescription("Teks yang akan di rubah")
    ),
  async execute(interaction) {
    const value = interaction.options.getString("input");
    morsingCode(value)
    if (value) return interaction.reply(`\`${otext}\` is morse code of \`"${value}"\``);
    return interaction.reply("No option was provided!");
  },
};
