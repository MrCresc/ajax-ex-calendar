// Rendo disponibili le funzionalità al solo caricamento completo del documento
$(document).ready(
  function () {
    // Inizializzo calendario sul valore "month" presente nell'HTML e anno del valore valAnno in JS
    var mese = $('#mese')
    var valMese = mese.attr('month')
    var valAnno = 2018
    scriviNomeMese(valAnno, valMese)
    creaMese(valAnno, valMese)
    holiday(valAnno, valMese)

    // Aggiungo funzione al click del tasto mese precedente
    $(document).on('click','#precedente',function () {
      var valAttualeMese = $('#mese').attr('month')
      var valMeseMeno = decrementaMese(valAttualeMese)
      scriviNomeMese(valAnno, valMeseMeno)
      creaMese(valAnno, valMeseMeno)
      holiday(valAnno, valMeseMeno)
    })

    // Aggiungo funzione al click del tasto mese successivo
    $(document).on('click','#successivo',function () {
      var valAttualeMese = $('#mese').attr('month')
      var valMesePiu = incrementaMese(valAttualeMese)
      scriviNomeMese(valAnno, valMesePiu)
      creaMese(valAnno, valMesePiu)
      holiday(valAnno, valMesePiu)
    })

    // -------------------------------------- INIZIO SEZIONE BONUS PERSONALI ----------------------------------------------

        // BONUS PERSONALE Aggiungo funzione al click della singola casella per maggiori informazioni
        $(document).on('click','.quadratino',function () {
          var stringaData = $(this).attr('valGiorno')
          var festaEventuale = $(this).children('.holiday').text()
          var infoData = moment(stringaData).format('dddd Do MMMM YYYY')
          alert(infoData + ', ' + festaEventuale)
        })

        // BONUS PERSONALE Aggiungo funzionalità al click del tasto KEY LEFT sulla tastiera
        $(document).keydown(
          function (event) {
            if (event.which === 37) {
              var valAttualeMese = $('#mese').attr('month')
              var valMeseMeno = decrementaMese(valAttualeMese)
              scriviNomeMese(valAnno, valMeseMeno)
              creaMese(valAnno, valMeseMeno)
              holiday(valAnno, valMeseMeno)
            }
          }
        )

        // BONUS PERSONALE Aggiungo funzionalità al click del tasto KEY RIGHT sulla tastiera
        $(document).keydown(
          function (event) {
            if (event.which === 39) {
              var valAttualeMese = $('#mese').attr('month')
              var valMesePiu = incrementaMese(valAttualeMese)
              scriviNomeMese(valAnno, valMesePiu)
              creaMese(valAnno, valMesePiu)
              holiday(valAnno, valMesePiu)
            }
          }
        )

    // -------------------------------------- FINE SEZIONE BONUS PERSONALI ----------------------------------------------

    // -------------------------------------------------FUNZIONI---------------------------------------------------------

    // Funzione che incrementa il valore del mese e se è inferiore a 9 mette uno 0 davanti
    function incrementaMese(valMese) {
      // Impongo condizione nel caso il numero del mese sia inferiore a 9
      if (valMese < 9) {
        // Rendo il valore un numero intero e aggiungo uno
        valMese = parseInt(valMese) + 1
        // Metto uno 0 davanti al valore e lo ritrasformo in stringa
        valMese = 0 + String(valMese)
        // Impongo condizione nel caso il numero del mese sia maggiore o uguale a 9 e inferiore a 12
      } else if (valMese >= 9 && valMese < 12) {
        // Rendo il valore un numero intero e aggiungo uno
        valMese = parseInt(valMese) + 1
        // Lo ritrasformo in stringa
        valMese = String(valMese)
        // Eseguo le funzioni
      }
      $('#mese').attr('month', valMese)
      return valMese;
    }

    // Funzione che decrementa il valore del mese e se è inferiore o uguale a 10 mette uno 0 davanti
    function decrementaMese(valMese) {
      // Impongo condizione nel caso il numero del mese sia inferiore o uguale a 10
      if (valMese > 1 && valMese <= 10) {
        // Rendo il valore un numero intero e sottraggo di uno
        valMese = valMese -1
        // Metto uno 0 davanti al valore e lo ritrasformo in stringa
        valMese = 0 + String(valMese)
      } else if (valMese > 10 && valMese <= 12) {
        // Rendo il valore un numero intero e sottraggo di uno
        valMese = parseInt(valMese) - 1
        // Lo ritrasformo in stringa
        valMese = String(valMese)
        // Eseguo le funzioni
      }
      $('#mese').attr('month', valMese)
      return valMese
    }

    // Funzione con chiamata AJAX per reperire informazioni dei giorni di festa
    function holiday(valAnno, valMese) {
      $.ajax(
        {
          url: 'https://flynn.boolean.careers/exercises/api/holidays',
          method: 'GET',
          // Imposto le condizioni della chiamata a seconda del mese scelto
          data: {year: valAnno, month: (parseInt(valMese) - 1)},
          // In caso di successo della chiamata
          success: function(dati) {
            // Inserisco in un array il data.response della chiamata AJAX
            arrayHolidays = dati.response
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

    // Funzione che crea dinamicamente le caselle dei giorni del mese relativo
    function creaMese(valAnno, valMese) {
      // Reset
      $('.container').children('.quadratino').remove()
      // Imposto data di riferimento a seconda del valore del mese
      var date = moment(valAnno + '-' + valMese + '-01')
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
          var dataEstesa = valAnno + '-' + valMese + '-0' + (i + 1)
          var context = { dayNumber: i + 1, valGiorno: dataEstesa};
          var html = template(context);
          $('.container').append(html)
        } else {
          // Imposto condizioni Handlebars
          var source = $('#entry-template').html();
          var template = Handlebars.compile(source);
          // Imposto attributo valGiorno ad ogni casella
          var dataEstesa = valAnno + '-' + valMese + '-' + (i + 1)
          var context = { dayNumber: i + 1, valGiorno: dataEstesa};
          var html = template(context);
          $('.container').append(html)
        }
      }
    }

    // Funzione che scrive il nome del mese in alto alla pagina a seconda del valore valMese
    function scriviNomeMese(valAnno, valMese) {
      if (valMese === '01') {
        mese.text('Gennaio '+ valAnno)
      } else if (valMese === '02') {
        mese.text('Febbraio '+ valAnno)
      } else if (valMese === '03') {
        mese.text('Marzo '+ valAnno)
      } else if (valMese === '04') {
        mese.text('Aprile '+ valAnno)
      } else if (valMese === '05') {
        mese.text('Maggio '+ valAnno)
      } else if (valMese === '06') {
        mese.text('Giugno '+ valAnno)
      } else if (valMese === '07') {
        mese.text('Luglio '+ valAnno)
      } else if (valMese === '08') {
        mese.text('Agosto '+ valAnno)
      } else if (valMese === '09') {
        mese.text('Settembre '+ valAnno)
      } else if (valMese === '10') {
        mese.text('Ottobre '+ valAnno)
      } else if (valMese === '11') {
        mese.text('Novembre '+ valAnno)
      } else if (valMese === '12') {
        mese.text('Dicembre '+ valAnno)
      }
    }
  }
)
