export default function latinToCyrillic(value: String) {
  var answer = '',
    a = {};

  a['A'] = 'А';
  a['B'] = 'Б';
  a['W'] = 'В';
  a['G'] = 'Г';
  a['D'] = 'Д';
  a['Ye'] = 'Е';
  a['Yo'] = 'Ё';
  a['J'] = 'Ж';
  a['Z'] = 'З';
  a['I'] = 'И';
  a['K'] = 'К';
  a['L'] = 'Л';
  a['M'] = 'М';
  a['N'] = 'Н';
  a['P'] = 'П';
  a['R'] = 'Р';
  a['S'] = 'С';
  a['T'] = 'Т';
  a['U'] = 'У';
  a['V'] = 'В';
  a['F'] = 'Ф';
  a['H'] = 'Х';
  a['Ts'] = 'Ц';
  a['Ch'] = 'Ч';
  a['Sh'] = 'Ш';
  a['Sch'] = 'Щ';
  a['E'] = 'Э';
  a['Yu'] = 'Ю';
  a['Ya'] = 'Я';

  a['a'] = 'а';
  a['b'] = 'б';
  a['w'] = 'в';
  a['g'] = 'г';
  a['d'] = 'д';
  a['ye'] = 'е';
  a['yo'] = 'ё';
  a['j'] = 'ж';
  a['z'] = 'з';
  a['i'] = 'и';
  a['ii'] = 'ий';
  a['k'] = 'к';
  a['l'] = 'л';
  a['m'] = 'м';
  a['n'] = 'н';
  a['p'] = 'п';
  a['r'] = 'р';
  a['s'] = 'с';
  a['t'] = 'т';
  a['u'] = 'у';
  a['v'] = 'в';
  a['ai'] = 'ай';
  a['f'] = 'ф';
  a['h'] = 'х';
  a['ts'] = 'ц';
  a['ch'] = 'ч';
  a['sh'] = 'ш';
  a['sch'] = 'щ';
  a['e'] = 'э';
  a['iii'] = 'ы';
  a['yu'] = 'ю';
  a['ya'] = 'я';

  a['Хятад'] = 'БНХАУ';
  a['хятад'] = 'БНХАУ';
  a['Орос'] = 'ОХУ';
  a['орос'] = 'ОХУ';

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
