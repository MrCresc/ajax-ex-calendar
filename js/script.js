// Rendo disponibili le funzionalità al solo caricamento completo del documento
$(document).ready(
  function () {
    // Inizializzo calendario sul valore standard (Gennaio)
    var mese = $('#mese')
    var valMese = mese.attr('month')
    scriviNomeMese(valMese)
    creaMese(valMese)
    holiday(valMese)

    // Aggiungo funzione al click del tasto mese precedente
    $(document).on('click','#precedente',function () {
      // Impongo condizione nel caso il numero del mese sia inferiore o uguale a 10
      if (valMese > 1 && valMese <= 10) {
        // Rendo il valore un numero intero e sottraggo di uno
        valMese = parseInt(valMese)-1
        // Metto uno 0 davanti al valore e lo ritrasformo in stringa
        valMese = 0 + String(valMese)
        // Eseguo le funzioni
        scriviNomeMese(valMese)
        creaMese(valMese)
        holiday(valMese)
      // Impongo condizione nel caso il numero del mese sia maggiore a 10
      } else if (valMese > 10 && valMese <= 12) {
          // Rendo il valore un numero intero e sottraggo di uno
          valMese = parseInt(valMese)-1
          // Lo ritrasformo in stringa
          valMese = String(valMese)
          // Eseguo le funzioni
          scriviNomeMese(valMese)
          creaMese(valMese)
          holiday(valMese)
      }
    })

    // Aggiungo funzione al click del tasto mese successivo
    $(document).on('click','#successivo',function () {
      // Impongo condizione nel caso il numero del mese sia inferiore a 9
      if (valMese < 9) {
        // Rendo il valore un numero intero e aggiungo uno
        valMese = parseInt(valMese)+1
        // Metto uno 0 davanti al valore e lo ritrasformo in stringa
        valMese = 0 + String(valMese)
        // Eseguo le funzioni
        scriviNomeMese(valMese)
        creaMese(valMese)
        holiday(valMese)
      // Impongo condizione nel caso il numero del mese sia maggiore o uguale a 9 e inferiore a 12
      } else if (valMese >= 9 && valMese < 12) {
          // Rendo il valore un numero intero e aggiungo uno
          valMese = parseInt(valMese)+1
          // Lo ritrasformo in stringa
          valMese = String(valMese)
          // Eseguo le funzioni
          scriviNomeMese(valMese)
          creaMese(valMese)
          holiday(valMese)
      }
    })


// -----------------------------------------------------FUNZIONI

    // Chiamata AJAX per reperire informazioni dei giorni di festa
    function holiday(valMese) {
      $.ajax(
        {
          url: 'https://flynn.boolean.careers/exercises/api/holidays?year=2018&month='+(parseInt(valMese)-1),
          method: 'GET',
          // In caso di successo della chiamata
          success: function(data) {
            // Inserisco in un array il data.response della chiamata AJAX
            arrayHolidays = data.response
            // Imposto ciclo for dove,in caso di festività, scriverò quest'ultima nella casella corretta
            for (var i = 0; i < arrayHolidays.length; i++) {
              var nomeHoliday = arrayHolidays[i].name
              var dataHoliday = arrayHolidays[i].date
              $('.quadratino[valGiorno='+dataHoliday+']').children('.holiday').addClass('red').text(nomeHoliday)
            }
          },
          // In caso di errore della chiamata
          error: function () {
            alert('Attenzione si è verificato un errore')
          }
        }
      );
    }

    // Creo dinamicamente le caselle dei giorni del mese relativo
    function creaMese(valMese) {
      // Reset
      $('.container').children('.quadratino').remove()
      // Imposto data di riferimento a seconda del valore del mese
      var date = moment('2018-'+valMese+'-01')
      // Calcolo quanti giorni ci sono nel seguente mese
      var giorniInMese = date.daysInMonth()
      // Imposto ciclo for dove il limite è il numero di giorni in un mese
      for (var i = 0; i < giorniInMese; i++) {
        // Nel caso di giorni con valore inferiore a 9
        if (i<9) {
          // Imposto condizioni Handlebars
          var source = $('#entry-template').html();
          var template = Handlebars.compile(source);
          // Imposto attributo valGiorno ad ogni casella
          var dataEstesa = '2018-'+valMese+'-0'+(i+1)
          var context = { dayNumber: i+1, valGiorno: dataEstesa};
          var html = template(context);
          $('.container').append(html)
        } else {
          // Imposto condizioni Handlebars
          var source = $('#entry-template').html();
          var template = Handlebars.compile(source);
          // Imposto attributo valGiorno ad ogni casella
          var dataEstesa = '2018-'+valMese+'-'+(i+1)
          var context = { dayNumber: i+1, valGiorno: dataEstesa};
          var html = template(context);
          $('.container').append(html)
        }
      }
    }

    // Scrivo il nome del mese in alto alla pagina a seconda del valore valMese
    function scriviNomeMese(valMese) {
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
