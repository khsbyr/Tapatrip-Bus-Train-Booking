export default function cyrillicToLatin(value: String) {
  var answer = '',
    a = {};

  a['Ё'] = 'Yo';
  a['Й'] = 'I';
  a['Ц'] = 'Ts';
  a['У'] = 'U';
  a['К'] = 'K';
  a['Е'] = 'E';
  a['Н'] = 'N';
  a['Г'] = 'G';
  a['Ш'] = 'Sh';
  a['Щ'] = 'Sch';
  a['Ө'] = 'U';
  a['Ү'] = 'U';
  a['З'] = 'Z';
  a['Х'] = 'Kh';
  a['Ъ'] = '';
  a['ё'] = 'yo';
  a['й'] = 'i';
  a['ц'] = 'ts';
  a['у'] = 'u';
  a['к'] = 'k';
  a['е'] = 'e';
  a['н'] = 'n';
  a['г'] = 'g';
  a['ш'] = 'sh';
  a['щ'] = 'sch';
  a['з'] = 'z';
  a['х'] = 'kh';
  a['ъ'] = "'";
  a['Ф'] = 'F';
  a['Ы'] = 'I';
  a['В'] = 'V';
  a['А'] = 'a';
  a['П'] = 'P';
  a['Р'] = 'R';
  a['О'] = 'O';
  a['Л'] = 'L';
  a['Д'] = 'D';
  a['Ж'] = 'Zh';
  a['Э'] = 'E';
  a['ф'] = 'f';
  a['ы'] = 'i';
  a['в'] = 'v';
  a['а'] = 'a';
  a['п'] = 'p';
  a['р'] = 'r';
  a['о'] = 'o';
  a['ө'] = 'u';
  a['ү'] = 'u';
  a['л'] = 'l';
  a['д'] = 'd';
  a['ж'] = 'zh';
  a['э'] = 'e';
  a['Я'] = 'Ya';
  a['Ч'] = 'Ch';
  a['С'] = 'S';
  a['М'] = 'M';
  a['И'] = 'I';
  a['Т'] = 'T';
  a['Ь'] = 'I';
  a['Б'] = 'B';
  a['Ю'] = 'Yu';
  a['я'] = 'ya';
  a['ч'] = 'ch';
  a['с'] = 's';
  a['м'] = 'm';
  a['и'] = 'i';
  a['т'] = 't';
  a['ь'] = 'i';
  a['б'] = 'b';
  a['ю'] = 'yu';

  for (const i in value) {
    if (value.hasOwnProperty(i)) {
      if (a[value[i]] === undefined) {
        answer += value[i];
      } else {
        answer += a[value[i]];
      }
    }
  }
  return answer;
}
