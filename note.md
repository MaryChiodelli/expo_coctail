R-N
React native usato per sviluppare app native in devices IOS, Android, Web
React Native può essere utilizzato sia per creare da zero applicazioni native, ma può essere anche inserito in una app esistente Native, come Swift, Kotlin oppure Objective-C
React native usa Metro per compilare il codice JS da un entrypoint in un unico bundled file
Possiamo installare librerie e dipendenze esterne con un node js package manager (npm, yarn etc)
Il linguaggio di default è TS, anche se JS è supportato ma sconsigliato dalla commmunity
- Componenti (https://reactnative.dev/docs/components-and-apis)

- Stile componenti
Si utilizza l'inline styling come prop del componente
EXPO
Si può usare in modalità standalone, anche se le ultime raccomandazioni suggeriscono di utilizzare questo linguaggio insieme a un framework.
Il framework React Native più utilizzato e più "pronto" per la produzione è Expo (Expo Dev), questo perché Expo fornisce funzionalità come routing basato su file, librerie universali di alta qualità e la possibilità di scrivere plugin che modificano il codice nativo senza dover gestire file nativi.
Expo ha una community molto attiva su Github e Discord, il team di EXPO lavora a stretto contatto con il team di META per migliorare l'SDK di EXPO per gli sviluppatori. EXPO rilascia anche gli EAS (EXPO Application Services - servizi cloud come gestione di build in produzione, servizio di pubblicazione e aggiornamento sugli store native) che sono una serie di servizi aggiuntivi utili per ampliare la potenzialità del framework.
Expo funziona però solo sui Macs; windows e linux sono attualmente non supportati.
- Architettura Filesystem
(tabs)
    Riguarda la bottom navigation, abbiamo un _layout che raggruppa le tabs in index e search
    Ogni pagina inserita in tabs, contiene sia il contenuto della pagina che l'inserimento nella navigazione
context
    Contiene le variabili e il wrapper per un theme context generale, utile per variabili e contesti globali
hooks
    Cartella create da Mary, con un custom hook per la gestione di stato per errore, loading e fetch di dati esterni
