// Rendo disponibili le funzionalità al solo caricamento completo del documento
$(document).ready(
  function () {
    var mese = $('#mese')
    var valMese = mese.attr('month')
    scriviMese(valMese)
    creaMese(valMese)
    holiday(valMese)

    $(document).on('click','#precedente',function () {
      if (valMese > 1 && valMese <= 10) {
        valMese = parseInt(valMese)-1
        valMese = 0 + String(valMese)
        scriviMese(valMese)
        creaMese(valMese)
        holiday(valMese)
      } else if (valMese > 10 && valMese <= 12) {
          valMese = parseInt(valMese)-1
          valMese = String(valMese)
          scriviMese(valMese)
          creaMese(valMese)
          holiday(valMese)
      }
    })

    $(document).on('click','#successivo',function () {
      if (valMese < 9) {
        valMese = parseInt(valMese)+1
        valMese = 0 + String(valMese)
        scriviMese(valMese)
        creaMese(valMese)
        holiday(valMese)
      } else if (valMese >= 9 && valMese < 12) {
          valMese = parseInt(valMese)+1
          valMese = String(valMese)
          scriviMese(valMese)
          creaMese(valMese)
          holiday(valMese)
      }
    })


// -----------------------------------------------------FUNZIONI

    function holiday(valMese) {
      $.ajax(
        {
          url: 'https://flynn.boolean.careers/exercises/api/holidays?year=2018&month='+(parseInt(valMese)-1),
          method: 'GET',
          success: function(data) {
            console.log(parseInt(valMese))
            arrayHolidays = data.response
            console.log(arrayHolidays)
            for (var i = 0; i < arrayHolidays.length; i++) {
              var nomeHoliday = arrayHolidays[i].name
              var dataHoliday = arrayHolidays[i].date
              $('.quadratino[valGiorno='+dataHoliday+']').children('.holiday').text(nomeHoliday)
            }

          },
          error: function () {
            alert('Attenzione si è verificato un errore')
          }
        }
      );
    }

    function creaMese(valMese) {
      $('.container').children('.quadratino').remove()
      var date = moment('2018-'+valMese+'-01')
      var giorniInMese = date.daysInMonth()
      for (var i = 0; i < giorniInMese; i++) {
        if (i<9) {
          var source = $('#entry-template').html();
          var template = Handlebars.compile(source);
          var dataEstesa = '2018-'+valMese+'-0'+(i+1)
          var context = { dayNumber: i+1, valGiorno: dataEstesa};
          var html = template(context);
          $('.container').append(html)
        } else {
        var source = $('#entry-template').html();
        var template = Handlebars.compile(source);
        var dataEstesa = '2018-'+valMese+'-'+(i+1)
        var context = { dayNumber: i+1, valGiorno: dataEstesa};
        var html = template(context);
        $('.container').append(html)
        }
      }
    }

    function scriviMese(valMese) {
      if (valMese === '01') {
        mese.text('Gennaio 2018')
      } else if (valMese === '02') {
        mese.text('Febbraio 2018')
      } else if (valMese === '03') {
        mese.text('Marzo 2018')
      } else if (valMese === '04') {
        mese.text('Aprile 2018')
      } else if (valMese === '05') {
        mese.text('Maggio 2018')
      } else if (valMese === '06') {
        mese.text('Giugno 2018')
      } else if (valMese === '07') {
        mese.text('Luglio 2018')
      } else if (valMese === '08') {
        mese.text('Agosto 2018')
      } else if (valMese === '09') {
        mese.text('Settembre 2018')
      } else if (valMese === '10') {
        mese.text('Ottobre 2018')
      } else if (valMese === '11') {
        mese.text('Novembre 2018')
      } else if (valMese === '12') {
        mese.text('Dicembre 2018')
      }
    }
  }
)
