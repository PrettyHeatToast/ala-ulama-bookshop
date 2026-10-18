# Ala Ulama Bookshop (ARG-site, eerste versie)

Statische site, geen server nodig. Upload alles in deze map naar de root van je domein.
`_artifact_index.html` en `LEESMIJ.md` niet uploaden.

## Pagina's
- index.html, products.html, ordering.html, guestbook.html, contact.html: de "winkel".
- raqmu.html: verborgen logboek van M. Nergens gelinkt.

## Puzzel naar de verborgen pagina
Op products.html staan lettervarianten van vijf kaarten, elk met een datum:
784R (ingetrokken 11 feb 2017), 726A (herzien 3 apr 2017), 760Q (22 sep 2017),
742M (9 jan 2018), 712U (2 jun 2018). Sorteer op datum -> R A Q M U -> /raqmu.html
726A is de enige variant die nog bestaat: de Roberts-Treasury die de spelers fysiek hebben.
Hint in de broncode van index.html: "Letter variants are for my own filing. Read them by date."

## Gastenboek
Namen vervagen per bezoeker vanaf zijn eerste bezoek (localStorage). De Gentse entries het snelst.
Testen: guestbook.html#dag10 simuleert 10 dagen. Tempo instellen bovenaan site.js.

## Contact
E-mailadres wordt automatisch mohsen@<jouwdomein>. Vast instellen: GM.domain in site.js.
Maak die mailbox aan (of een forward) zodat je als M. kan antwoorden.

## Nog in te vullen
- Echte scans van de postkaarten (nu tekstlijst, geen afbeeldingen).
- De Gentse ARG-locatie: laatste notitie op raqmu.html zegt "look up", naar een gevelsteen.

## Postkaarten
img/card01..card14.jpg = 712, 717, 718, 726, 726A, 730, 742, 746, 749, 760, 769, 775, 784, 790.
Nummers en puzzelvarianten staan in de lijst `cards` in build.py.
