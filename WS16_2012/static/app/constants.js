/*global angular*/
(function (angular) {
    "use strict";
    angular.module('app.constants', [])
        .constant('PRIORITIES', [
            {
                name: "Blocker",
                description: "Blokira dalji razvoj ili testiranje aplikacije, aplikacija ne može da se pokrene.",
                value: 1
            },
            {
                name: "Critical",
                description: "Aplikacija nije stabilna, dolazi do gubitaka podataka ili ozbiljna curenja memorije",
                value: 2
            },
            {
                name: "Major",
                description: "Veliki nedostaci u funkcionalnostima",
                value: 3
            },
            {
                name: "Minor",
                description: "Manji nedostaci u funkcionalnostima ili problemi koji se jednostavno mogu zaobići",
                value: 4
            },
            {
                name: "Trivial",
                description: "Problemi “kozmetičke” prirode, kao što su slovne greške",
                value: 5
            }])
        .constant('STATUSES', [
            {
                name: "To Do",
                description: "zadatak je kreiran, ali jos nije počela njegova implementacija"
            },
            {
                name: "In Progress",
                description: "implementacija zadatka je u toku"
            },
            {
                name: "Verify",
                description: "Implementacija je završena i čeka se da ostali clanovi tima verifikuju implementaciju"
            },
            {
                name: "Done",
                description: "Implementacija i verifikacija su uspešno završene"
            }
        ])
        .constant('USERNAME_REGEX', /^[A-Za-z0-9]+$/);
}(angular));
