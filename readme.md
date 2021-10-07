# Gruppeoppgave 1 - Bestille båttur
#### s341833, s341867 og s331394

## Introduksjon

Vi implementerte en løsning for å bestille billetter for color line. Vi har prøvd å holde det så
simpelt som mulig designmessig, men med all nødvendig funksjonalitet. Selv om det er simpelt design
er det fortsatt tilrettelagt for full responsivitet. Der vi har sett det passende har vi noen steder
lagt til eksta funksjonalitet for å vise både at vi kan og samtidig gi litt bedre "quality of life".
Det har vært mange ting vi har hatt lyst til å implementere opp gjennom utføringen, men som vi så
skulle være til oppgave 2, og har derfor ventet med dette.

## Implementasjon av backend

Vi har tatt i bruk Model View Controller (MVC). Vi har til tross ikke sett nødvendigheten av View i 
denne oppgaven. Databasestrukturen er utført med Entity Framework Code First hvor entitetene våre
er Bestilling, Reise, Lugar, Kunde og Post. Kundeentiteten har vi valgt å dele inn i 3 ulike tabeller
Kontaktperson, Voksen og Barn. Som alle arver fra kundeklassen. Dette fordi de har litt forskjellige
egenskaper og nødvendigheter. Post er tabell for å sjekke gyldighet og hente poststed til postnummer.

Vi har flyttet all databasehåndtering ut til DAL-mappen. Her har vi interface-klasse struktur for
repositoryene slik at vi får injisert de i controller klassene. Vi har også en seeding fil som kalles
ved startup. Denne legger inn reisene og lugarene samt postnummer og poststed ved tom database.



## Implementasjon av frontend


## Interaksjon med sluttproduktet


## Liste med mål og krav(som vi mener er implementert)


## Skjermbilder


## Kommentarer om valg vi har tatt


## Kilder