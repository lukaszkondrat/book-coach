# book-coach

Prawie wszystko działa .. :)
Jeszcze nie ma backendu i zanim przepisze kod z użyciem Reduxa (bo na razie używam sobie tylko useState'a), to mam prośbę, żebyś mi zerknął na to,
co na razie zrobiłem, bo mam dwa problemy:

1) używam sobie zaimportowanego zewnętrznego komponentu FullCalendar i go można dość łatwo dostosować do swoich potrzeb przy użyciu propsów.
Ja napisałem sobie też komponent ModalBooking.js, bo chciałem stamtąd ściągać dodatkowo dane osoby rezerwującej.
W FullCalendar jest props select, który odpala u mnie funkcję selectDateHandler, która głównie jest odpowiedzialna za wybieranie daty/godziny i rezerwację,
ale problem polega na tym, że nie wiem, jak mam się 'wciąć' z tymi danymi osoby rezerwującej (z ModalBooking.js) przed ten fragment kodu w App.js:

const newEvent = {
            id: createId(),
            title,
            ...selectionInfo,
          };
          calendarApi.addEvent(newEvent);
          setEvents((prevEv) => [newEvent, ...prevEv]);
          
, który odpowiada za zrobienie rezerwacji i jej wyrenderowanie w tym zewnętrzym komponencie FullCalendar.
Bo bez tego 'wcięcia' potem musze sztucznie aktualizować state przy użyciu jeszcze kolejnego useState (updatedEvents), który mi to scala w jeden obiekt,
ale wątpie, żeby to była dobra praktyka...

2) ten problem jest powiązany z pierwszym, bo ponieważ nie wiem, jak mam się 'wciąć' przed ten fragment kodu powyżej, to kombinowałem z kolejnym statem,
żeby mi weryfikował, czy dane w komponencie ModalBooking.js zostały poprawnie wprowadzone. Bez tego kolejnego state (isValid) rezerwacja się robiła nawet wtedy,
jak naciskałem przycisk X w tym modalu, żeby go zamknąć. Teraz działa przynajmniej w ten sposób, że nie tworzy się rezerwacja, kiedy zamykasz modal, ale
jak dane są poprawnie wprowadzone to kalendarz renderuje rezerwacje dopiero w kolejnym cyklu (w sumie na logikę tak powinno być, dlatego myślę, że ta cała
weryfikacja powinna być w tym samym miejscu kodu, co przy problemie nr 1).


