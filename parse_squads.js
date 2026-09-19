const fs = require('fs');

const rawText = `
real Madrid
Goalkeepers
1 Thibaut Courtois (BEL, 34)
13 Andriy Lunin (UKR, 27)
26 Sergio Mestre (ESP, 21)
31 Javi Navarro (ESP, 19)
Defenders
2 Raúl Asencio (ESP, 23)
3 Éder Militão (BRA, 28)
4 Dean Huijsen (ESP, 21)
12 Trent Alexander-Arnold (ENG, 27)
16 Ibrahima Konaté (FRA, 27)
17 Marc Cucurella (ESP, 28)
18 Álvaro Carreras (ESP, 23)
22 Antonio Rüdiger (GER, 33)
23 Ferland Mendy (FRA, 31)
24 Denzel Dumfries (NED, 30)
Midfielders
5 Jude Bellingham (ENG, 23)
6 Eduardo Camavinga (FRA, 23)
8 Federico Valverde (URU, 28) – Captain
14 Aurélien Tchouaméni (FRA, 26)
15 Arda Güler (TUR, 21)
20 Bernardo Silva (POR, 32)
21 Brahim Díaz (MAR, 27)
Forwards
7 Vinícius Júnior (BRA, 26)
9 Endrick (BRA, 20)
10 Kylian Mbappé (FRA, 27)
11 Rodrygo (BRA, 25)
19 Carlos Espí (ESP, 21)
25 Yan Diomande (CIV, 19)
Coach: José Mourinho
Barcelona
Goalkeepers
1 Joan García (ESP, 25)
13 Wojciech Szczęsny (POL, 36)
25 Dominik Livaković (CRO, 31)
Defenders
2 João Cancelo (POR, 32)
3 Alejandro Balde (ESP, 22)
5 Pau Cubarsí (ESP, 19)
15 Andreas Christensen (DEN, 30)
18 Gerard Martín (ESP, 24)
23 Jules Koundé (FRA, 27)
24 Eric García (ESP, 25)
Midfielders
6 Gavi (ESP, 22)
8 Pedri (ESP, 23)
16 Rodri (ESP, 30)
20 Dani Olmo (ESP, 28)
21 Frenkie de Jong (NED, 29)
22 Marc Bernal (ESP, 19)
Forwards
7 Fermín López (ESP, 23)
9 Gabriel Jesus (BRA, 29)
10 Lamine Yamal (ESP, 19)
11 Raphinha (BRA, 29)
14 Karim Adeyemi (GER, 24)
17 Anthony Gordon (ENG, 25)
Coach: Hansi Flick
Atlético Madrid
Goalkeepers
1 Juan Musso (ARG)
13 Jan Oblak (SVN) – Captain
Defenders
José Giménez (URU)
Cristian Romero (ARG)
Robin Le Normand (ESP)
Dávid Hancko (SVK)
Marcos Llorente (ESP)
Álex Grimaldo (ESP)
Marc Pubill (ESP)
Midfielders
Koke (ESP) – Captain
Pablo Barrios (ESP)
Johnny Cardoso (USA)
Álex Baena (ESP)
Lee Kang-in (KOR)
Morten Hjulmand (DEN)
Forwards
Alexander Sørloth (NOR)
Ademola Lookman (NGA)
Jonathan David (CAN)
Julián Álvarez (ARG)
Coach: Diego Simeone
Real Betis
Goalkeepers
1 Álvaro Valles (ESP)
13 Diego Conde (ESP, loan)
Defenders
2 Héctor Bellerín (ESP)
3 Diego Llorente (ESP)
4 Natan (BRA)
5 Marc Bartra (ESP)
11 Fran García (ESP)
23 Junior Firpo (DOM)
Midfielders
8 Pablo Fornals (ESP)
20 Giovani Lo Celso (ARG)
21 Marc Roca (ESP)
22 Isco (ESP) – Captain
25 Dani Ceballos (ESP)
Facundo Bernal (URU)
Forwards
7 Antony (BRA)
9 Cucho Hernández (COL)
10 Abde Ezzalzouli (MAR)
19 Troy Parrott (IRL)
Coach: Manuel Pellegrini (or current manager)
Villarreal 2026/27 Squad
🧤 Goalkeepers
Luiz Júnior
Péter Gulácsi
Rubén Gómez
Yakiv Kinareikin
Pablo Polo
🛡️ Defenders
Logan Costa
Alex Freeman
Pau Navarro
Juan Foyth
Renato Veiga
Santiago Mouriño
Carlos Romero
Sergi Cardona
Willy Kambwala — loan
Daniel Budesca
Jordi Valou
⚙️ Midfielders
Alberto Moleiro
Santi Comesaña
Pape Gueye
Nathan Saliba
Alassane Diatta
Carlos Maciá
C. Tidiane Thiam
Nizar El Jmili
Mahamoud Barry
Joselillo Gaitán
César Bonafé Ceita
Álvaro Alcaide
Moussa Traoré
⚡ Forwards
Gerard Moreno
Georges Mikautadze
Ilias Akhomach
Tajon Buchanan
Nicolas Pépé
Ayoze Pérez
Tani Oluwaseyi
Douga Fofana
Arsenal
Goalkeepers
1 David Raya (ESP, 30)
13 Kepa Arrizabalaga (ESP, 31)
30 Illan Meslier (FRA, 26)
Defenders
2 William Saliba (FRA, 25)
3 Cristhian Mosquera (ESP, 22)
4 Ben White (ENG, 28)
5 Piero Hincapié (ECU, 24)
6 Gabriel (BRA, 28)
12 Jurriën Timber (NED, 25)
15 Ezri Konsa (ENG, 28)
33 Riccardo Calafiori (ITA, 24)
49 Myles Lewis-Skelly (ENG, 19)
Midfielders
8 Martin Ødegaard (NOR, 27)
10 Eberechi Eze (ENG, 28)
20 Noni Madueke (ENG, 24)
23 Mikel Merino (ESP, 30)
29 Kai Havertz (GER, 27)
36 Martín Zubimendi (ESP, 27)
39 Bruno Guimarães (BRA, 28)
41 Declan Rice (ENG, 27)
Forwards
7 Bukayo Saka (ENG, 25)
14 Viktor Gyökeres (SWE, 28)
17 Christos Tzolis (GRE, 24)
Coach: Mikel Arteta
Manchester City
Key Players
Goalkeepers: Ederson / Gerónimo Rulli
Defenders: Rúben Dias, Josko Gvardiol, Rico Lewis, etc.
Midfielders: Enzo Fernández, Elliot Anderson, Ayyoub Bouaddi, Phil Foden, Bernardo Silva (sold), Rodri (sold)
Forwards: Erling Haaland, Iliman Ndiaye, Allan, Jérémy Doku
(City– Enzo, Anderson, Bouaddi, Ndiaye )
Liverpool
Key Players
Goalkeepers: Alisson
Defenders: Virgil van Dijk, Ibrahima Konaté (sold to Real Madrid), Ronald Araújo (loan), Jérémy Jacquet
Midfielders: Alexis Mac Allister, Dominik Szoboszlai, Curtis Jones (sold)
Forwards: Bradley Barcola, Víctor Muñoz, Cody Gakpo, Darwin Núñez / Isak
(Barcola सबसे बड़ी साइनिंग है।)
Manchester United
Key Players
Goalkeepers: André Onana
Defenders: Lisandro Martínez, Harry Maguire, Noussair Mazraoui
Midfielders: Bruno Fernandes, Kobbie Mainoo, Casemiro
Forwards: Rasmus Højlund (sold to Napoli), Alejandro Garnacho, Marcus Rashford (status unclear), new signings
Goalkeepers
Emiliano Martínez
Robin Olsen
Marco Bizot
🛡️ Defenders
Matty Cash
Ezri Konsa
Pau Torres
Tyrone Mings
Lucas Digne
Ian Maatsen
Andrés García
Taylor Harwood-Bellis
Kosta Nedeljković
⚙️ Midfielders
João Gomes
Amadou Onana
Boubacar Kamara
Youri Tielemans
Douglas Luiz
John McGinn
Ross Barkley
Enzo Barrenechea
⚡ Attackers
Ollie Watkins
Jhon Durán
Nicolas Jackson
Marcus Rashford
Jadon Sancho
Alejandro Garnacho
Johan Manzambi
Leon Bailey
Samuel Iling-Junior
Evann Guessandomo
Goalkeepers
Jean Butez
Robert Sánchez
Defenders
Trevoh Chalobah
Yan Couto
Jacobo Ramón
Alberto Dossena
Marc Kempf
Alex Valle
Kaiki
Ivan Smolčić
Midfielders
Lucas da Cunha
Luis Milla
Máximo Perrone
Martin Baturina
Nico Paz
Samuele Ricci
Mattia Liberali
Forwards
Moise Kean
Assane Diao
Anastasios Douvikas
Jesús Rodríguez
Coach: Cesc Fàbregas
Inter Milan
Goalkeepers
1 Josep Martínez
12 Raffaele Di Gennaro
49 Ivan Provedel
Defenders
6 John Stones
25 Manuel Akanji
28 Benjamin Pavard
30 Carlos Augusto
31 Yann Bisseck
95 Alessandro Bastoni
99 Djed Spence
Midfielders
7 Piotr Zieliński
8 Petar Sučić
17 Andy Diouf
20 Hakan Çalhanoğlu
21 Curtis Jones
22 Henrikh Mkhitaryan
23 Nicolò Barella
32 Federico Dimarco
Forwards
9 Marcus Thuram
10 Lautaro Martínez
11 Luis Henrique
14 Ange-Yoan Bonny
Coach: Cristian Chivu
Napoli
Goalkeepers
1 Alex Meret
32 Vanja Milinković-Savić
Defenders
13 Amir Rrahmani
16 Rafa Marín
17 Mathías Olivera
22 Giovanni Di Lorenzo
Leonardo Spinazzola
Sam Beukema
Benoît Badiashile
Midfielders
6 Billy Gilmour
11 Kevin De Bruyne
68 Stanislav Lobotka
Forwards
7 David Neres
19 Rasmus Højlund
20 Lorenzo Lucca
21 Matteo Politano
27 Alisson Santos
Coach: Massimiliano Allegri
Roma
Key Players
Goalkeepers: Mile Svilar
Defenders: Gianluca Mancini, Evan Ndicka, Mario Hermoso, Devyne Rensch, Wesley França
Midfielders: Bryan Cristante, Manu Koné, Lorenzo Pellegrini
Forwards: Paulo Dybala, Donyell Malen, Matías Soulé, Santiago Castro, Rodrigo Mora
Coach: Gian Piero Gasperini
Bayern München — 2026/27
GK
Manuel Neuer
Sven Ulreich
Jonas Urbig
DEF
Dayot Upamecano
Kim Min-jae
Jonathan Tah
Alphonso Davies
Hiroki Ito
Sacha Boey
Konrad Laimer
Josip Stanišić
Nathaniel Brown
MID
Joshua Kimmich
Aleksandar Pavlović
Jamal Musiala
Tom Bischof
Ismaël Saibari
Lennart Karl
Bara Sapoko Ndiaye
FWD
Harry Kane
Luis Díaz
Michael Olise
Serge Gnabry
Arijon Ibrahimović*
Manager: Vincent Kompany
🔄 Major changes
IN: Nathaniel Brown, Ismaël Saibari
OUT: Leon Goretzka → Aston Villa, João Palhinha → Benfica, Bryan Zaragoza → Espanyol, etc.
⚠️ Arijon Ibrahimović was loaned out late in the window, so for a strict current club squad he should not be counted.
🇩🇪 Borussia Dortmund — 2026/27
GK
Gregor Kobel
Alexander Meyer
Diant Ramaj*
DEF
Nico Schlotterbeck
Waldemar Anton
Niklas Süle*
Ramy Bensebaini
Julian Ryerson
Daniel Svensson
Yan Couto*
Joane Gadou
Luca Reggiani
MID
Marcel Sabitzer
Felix Nmecha
Pascal Groß
Emre Can
Joey Veerman
Jobe Bellingham
Konstantinos Karetsas
Giannis Konstantelias
Justin Lerma
Ethan Nwaneri*
FWD
Serhou Guirassy
Fábio Silva
Maximilian Beier
Julien Duranville*
Karim Adeyemi*
Jamie Gittens*
Manager: Niko Kovač
🔄 Major changes
IN
Joey Veerman
Konstantinos Karetsas
Giannis Konstantelias
Joane Gadou
Kauã Prates
Justin Lerma
Ethan Nwaneri — loan
OUT
Karim Adeyemi → Barcelona
Julian Brandt → Ajax
Salih Özcan → Beşiktaş
Yan Couto → Como
Almugera Kabar → NEC
Diant Ramaj → Copenhagen
Kjell Wätjen → Midtjylland
Niklas Süle retired
The Bundesliga's official transfer centre confirms these 2026 moves.
🇩🇪 VfB Stuttgart — 2026/27
GK
Alexander Nübel
Fabian Bredlow
Dennis Seimen
DEF
Josha Vagnoman
Jeff Chabot
Julian Chabot
Anthony Rouault
Dan-Axel Zagadou
Maximilian Mittelstädt
Ramon Hendriks
Leonidas Stergiou
Finn Jeltsch
MID
Angelo Stiller
Atakan Karazor
Enzo Millot
Jamie Leweling
Chris Führich
Fabian Rieder
Yannik Keitel
Laurin Ulrich*
Mahmoud Dahoud
FWD
Deniz Undav
Ermedin Demirović
Tiago Tomás
El Bilal Touré
Nick Woltemade ❌
Manager: Sebastian Hoeneß
⚠️ Important correction
Nick Woltemade is NOT current Stuttgart. Don't put him in your 2026/27 Stuttgart app squad.
Also, Bilal El Khannouss was only a 2025/26 loan, so don't carry him into 2026/27 automatically.
Stuttgart retained Ermedin Demirović despite transfer speculation.
🇩🇪 RB Leipzig — 2026/27
GK
Maarten Vandevoordt
Ørjan Nyland
DEF
David Raum
Castello Lukeba
Willi Orbán
Lukas Klostermann
Maxime Estève
Mohamed Simakan*
El Chadaille Bitshiabu*
Abdoul Koné
MID
Nicolas Seiwald
Amadou Haidara
Xaver Schlager*
Rocco Reitz
Arthur Vermeeren
Neil El Aynaoui
Brajan Gruda
Ota Yamamoto
FWD
Christopher Nkunku
Marc Guiu
Benjamin Šeško*
Loïs Openda*
Antonio Nusa
Yussuf Poulsen*
🚨 MOST IMPORTANT
YAN DIOMANDÉ ❌ RB Leipzig
🇪🇸 Yan Diomandé → REAL MADRID ✅
So your database should have:
Yan Diomande
Current Club: Real Madrid
Previous Club: RB Leipzig
Season: 2026/27
Position: RW/LW
And NOT in Leipzig's squad.
🔄 Leipzig's major 2026 changes
IN
Neil El Aynaoui
Maxime Estève
Ørjan Nyland
Marc Guiu
Rocco Reitz
Arthur Vermeeren — returned
Christopher Nkunku — loan from AC Milan
Brajan Gruda — loan extended
OUT
Yan Diomandé → Real Madrid ✅
Péter Gulácsi → Villarreal
Lutsharel Geertruida → PSV
Xaver Schlager → Nottingham Forest
Loïs Openda → Juventus
Eljif Elmas → Atalanta
Kosta Nedeljković → Aston Villa
Ayodele Thomas → NEC
El Chadaille Bitshiabu → Galatasaray
Nkunku's return to Leipzig for 2026/27 is also confirmed as a loan from AC Milan.
Marc Guiu joined Leipzig on a five-year deal through 2031
LASK — 2026/27 UCL Squad
🧤 GK
Lukas Jungwirth
Tobias Schützenauer
Christof Katzmayr*
Fabian Schillinger
🛡️ DEF
George Bello
Miguel Freckleton
Xavier Mbuyamba
Andrés Andrade
Kasper Jørgensen
Manoël Verhaeghe*
Daniel Elfadli
Yvan Dibango
Jakob Wansch*
Ryan Rodriguez German*
Luca Ortner*
João Victor Tornich
Armin Midzic*
Jonas Ilk*
Alan Wimmer*
⚙️ MID
Melayro Bogarde
Kryštof Daněk
Robert Ljubičić
Alessandro Schöpf
Christoph Lang
Florian Flecker
Sascha Horvath
⚡ FWD
Samuel Adeniran
Moses Usor
Saša Kalajdžić
Matthias Hartl*
Paul Krapf*
Nael Kane*
👔 Manager
Dietmar Kühbauer
= UEFA List B player.
🔥 Important transfers
LASK's current squad includes Daniel Elfadli, who joined from Hamburg, and Robert Ljubičić, who joined from AEK Athens.
And Samuel Adeniran is the key attacker — he scored twice in LASK's incredible 5–1 comeback against Celtic that sent them into the Champions League league phase
🇦🇿 Sabah FK — 2026/27
🧤 GK
1 Amin Ramazanov
12 Rauf Ayyubov
92 Stas Pokatilov
94 Ravan Mirzammadov
🛡️ DEF
3 Steve Solvet
4 Aden McCarthy
5 Rahman Dashdamirov
17 Tellur Mutallimov
27 Tymoteusz Puchacz
33 Erivaldo Almeida
80 Akim Zedadka
⚙️ MID
6 Abdulakh Khaibulaev
7 Umarali Rakhmonaliev
9 Khayal Aliyev
10 Aleksey Isaev
11 Kaheem Parris
13 Ivan Lepinjica
16 Rauf Rustamli
37 Du Queiroz
88 Rodrigo Fernandes
89 Jafar Mukhtarov
95 Shahin Ibrahimov
⚡ FWD
18? / UEFA list: current UEFA squad page's displayed excerpt does not expose the full forward section, so I don't want to invent names/numbers.
👔 Manager
Valdas Dambrauskas — he is the coach who led Sabah into their first-ever Champions League campaign.
🔥 Important 2026/27 additions
Tymoteusz Puchacz — permanent move after his previous loan spell; UEFA calls him Sabah's big summer signing.
Akim Zedadka
Steve Solvet
Aden McCarthy
Erivaldo Almeida
🧤 GK
Yann Sommer
Nordin Jackers
Senne Lammens
🛡️ DEF
Joaquin Seys
Brandon Mechele
Joel Ordoñez
Zaid Romero
Bjorn Meijer
Kyriani Sabbe
Maxim De Cuyper
Joaquin Seys
Ardon Jashari
⚙️ MID
Hans Vanaken
Raphael Onyedika
Casper Nielsen
Hugo Vetlesen
Michal Skóraś
Christos Tzolis ❌ left
Ardon Jashari ❌ left
⚡ FWD
Ferran Jutglà
Romeo Vermant
Nilsson
Antonio Nusa ❌ left previously
Johan Manzambi
Carlos Forbs
👔 Manager
Ivan Leko
🔄 Important 2026 transfers
IN
🧤 Yann Sommer ← Inter — free transfer, contract until 2029.
⭐ Johan Manzambi — Club Brugge's major summer signing according to UEFA.
Carlos Forbs — attacking addition
OUT
🇬🇷 Christos Tzolis → Arsenal — reported around £34m.
Ardon Jashari → AC Milan
Other departures/loans removed from the current squad
🇨🇿 SK Slavia Praha — 2026/27
🧤 GK
Jindřich Staněk
Aleš Mandous
Antonín Kinský
🛡️ DEF
Štěpán Chaloupek
Tomáš Holeš
David Zima
Ange N'Guessan
Tomáš Vlček
Mikuláš Konečný
Jan Bořil
El Hadji Malick Diouf
⚙️ MID
Oscar Dorley
Christos Zafeiris
Lukáš Provod
Petr Ševčík
Mojmír Chytil
David Douděra
Filip Prebsl
Conrad Wallem
Houssem Ghacha
⚡ FWD
Tomáš Chorý
Václav Jurečka
Daniel Fila
Muhamed Tijani
G. Sosseh
👔 Manager
Jindřich Trpišovský
🔄 2026 transfer points
Slavia's 2026 recruitment included G. Sosseh (€3m), Bryan Ouanda, David Jurásek and H. Kanté, according to the current transfer record
🇫🇷 LOSC Lille — 2026/27 UCL
🧤 GK
1 Berke Özer
12 Orlando Gill
50 Thomas Sajous ⭐
🛡️ DEF
2 Loun Srdanović
3 Nathan Ngoy
4 Alexsandro
15 Romain Perraud
22 Tiago Santos
23 Tanguy Nianzou
24 Calvin Verdonk
26 Isaac Cossier
38 Maxima Goffi
⚙️ MID
6 Nabil Bentaleb
8 Ethan Mbappé
10 Hákon Arnar Haraldsson
11 Osame Sahraoui
14 Maurits Kjærgaard
17 Ngal'Ayel Mukau
19 Başar Önal
21 Benjamin André
⚡ FWD
7 Dilane Bakwa
9 Olivier Giroud
18 Ayase Ueda
28 Gaëtan Perrin
35 Soriba Diaoune ⭐
Manager: Davide Ancelotti
⭐ = UEFA List B.
Major signing: Ayase Ueda from Feyenoord.
🇫🇷 RC Lens — 2026/27 UCL
🧤 GK
1 Régis Gurtner
16 Mathieu Gorgelin
30 Daivy Lefranc-Yeboah ⭐
40 Robin Risser
41 Arthur Mogo Njimfo ⭐
42 Fedwan Messaoudi ⭐
🛡️ DEF
2 Ruben Aguilar
4 Nidal Čelik
6 Samson Baidoo
14 Matthieu Udol
20 Jean-Clair Todibo
22 Michał Skóraś
23 Saud Abdulhamid
24 Jonathan Gradit
25 Ismaëlo Ganiou
31 Souleymane Sagnan
32 Kyllian Antonio
33 Djulian Fernoc ⭐
39 Noé Kemtchoum ⭐
⚙️ MID
5 Andrija Bulatović
8 Yacine Titraoui
21 Amadou Haidara
27 Mickaël Cuisance
34 Léopold Joursky ⭐
36 Nathanaël Gane Bernardino ⭐
43 Lucas Robbe ⭐
⚡ FWD
7 Florian Sotoca
9 Thorgan Hazard
10 Florian Thauvin
11 Odsonne Édouard
19 Abdallah Sima
28 Junior Kadile
29 Franjo Ivanović
35 Mohamed Seddik ⭐
38 Mezian Mesloub ⭐
Manager: Dino Toppmöller
⭐ = List B.
🔥 Important Lens transfers
Lens have significantly strengthened their squad for their Champions League return, including Jean-Clair Todibo, Samson Baidoo, Amadou Haidara, Franjo Ivanović and Thorgan Hazard among the notable names now in the UCL squad.
🇫🇷 Paris Saint-Germain — 2026/27 UCL
🧤 GK
16 Alessandro Longoni
30 Lucas Chevalier
39 Matvei Safonov
70 Arthur Vignaud ⭐
80 Adam Mouak ⭐
🛡️ DEF
2 Achraf Hakimi
4 Lucas Beraldo
5 Marquinhos
6 Illia Zabarnyi
12 Lucas Digne
21 Lucas Hernández
25 Nuno Mendes
42 David Boly ⭐
51 Willian Pacho
⚙️ MID
8 Fabián Ruiz
11 Maghnes Akliouche
17 Vitinha
24 Senny Mayulu
27 Dro Fernández
33 Warren Zaïre-Emery
87 João Neves
⚡ FWD
7 Khvicha Kvaratskhelia
9 Ferran Torres
10 Ousmane Dembélé
14 Désiré Doué
22 Mika Godts
47 Quentin Ndjantou
Manager: Luis Enrique
⭐ = List B.
🔥 PSG's major 2026 changes
The biggest obvious additions for your database are:
Lucas Chevalier → PSG
Illia Zabarnyi → PSG
Lucas Digne → PSG
Maghnes Akliouche → PSG
Ferran Torres → PSG
Mika Godts → PSG
And the current squad is already producing: Ferran Torres scored a hat-trick and Dembélé scored twice in PSG's 6–1 UCL opening win over Slovan Bratislava. 🇬🇷 AEK Athens — 2026/27 UCL
🧤 GK
1 Thomas Strakosha
41 Marios Balamotis ⭐
91 Alberto Brignoli
🛡️ DEF
2 Harold Moukoudi
3 Stavros Pilios
12 Lazaros Rota
21 Domagoj Vida
22 Charalampos Lykogiannis
44 Filipe Relvas
⚙️ MID
6 Kaan Kairinen
8 Mijat Gaćinović
14 Lovro Majer
16 Kervin Arriaga
18 Răzvan Marin
20 Petros Mantalos
27 Milán Vitális
⚡ FWD
9 Luka Jović
10 Oleksandr Zubkov
11 Aboubakary Koita
19 Barnabás Varga
23 João Mário
90 Zini
👔 Manager
Marko Nikolić
⭐ = UEFA List B player.
🔥 2026/27 transfer highlights
IN
⭐ Oleksandr Zubkov — from Trabzonspor; AEK's major summer signing.
Lovro Majer
Kaan Kairinen
Barnabás Varga
Key players
Luka Jović — AEK's main striker; scored 17 league goals in his first season for the club.
Răzvan Marin — already scored the winner against LASK in AEK's UCL opener.
Oleksandr Zubkov — major creative addition.
🇳🇱 Feyenoord — 2026/27 UCL
🧤 GK
1 Tjark Ernst
33 Florian Kastenmeier
37 Mannou Berger
39 Liam Bossin
51 Stenn de Mol ⭐
61 Tim Haksteeg ⭐
🛡️ DEF
2 Bart Nieuwkoop
4 Tsuyoshi Watanabe
5 Gijs Smal
6 Jerry St. Juste
15 Jordan Bos
16 Javi López
20 Mats Deijl
35 Mika Mármol
24 Thijs Kraaijeveld ⭐
26 Givairo Read ⭐
32 Tijme Wessels ⭐
52 Marleyson Cruz ⭐
53 Twan Schens ⭐
55 Hakeem Agboluaje ⭐
63 Matthew Mparaganda ⭐
65 Dani Slory ⭐
70 Boaz Plantinga ⭐
⚙️ MID
7 Jakub Moder
8 Gjivai Zechiël
10 Luciano Valente
14 Sem Steijn
28 Oussama Targhalline
34 Charles Vanhoutte
22 Tobias van den Elshout ⭐
54 Nick de Koning ⭐
56 Nassim El Harmouz ⭐
60 Kevin Khan ⭐
66 Zino Sneijer ⭐
67 Luca Dahl Tomasson ⭐
⚡ FWD
11 Gonçalo Borges
17 Reiss Nelson
19 Nacho Ferri
23 Anis Hadj Moussa
27 Gaoussou Diarra
36 Jivayno Zinhagel ⭐
49 Shaqueel van Persie ⭐
57 Jerayno Schaken ⭐
58 Arman Nahany ⭐
59 Izu Onunta ⭐
64 Kelvin Neijenhuis ⭐
Manager: Giovanni van Bronckhorst.
⭐ = UEFA List B.
🇳🇱 PSV Eindhoven — 2026/27 UCL
🧤 GK
1 Nick Olij
32 Matěj Kovář
51 Tijn Smolenaars ⭐
61 Stijn Kuijsten ⭐
71 Jim Aerts ⭐
81 Kane Aerts ⭐
🛡️ DEF
2 Lutsharel Geertruida
3 Yarek Gasiorowski
4 Armando Obispo
6 Ryan Flamingo
8 Sergiño Dest
17 Mauro Júnior
18 Filip Kostić
25 Kiliann Sildillia
30 Michael Bresser ⭐
36 Wessel Kuhn ⭐
38 Fabian Merién ⭐
40 Floris Bos ⭐
46 Madi Nsosemo ⭐
49 Dyran Stam ⭐
53 Brent Jonkers ⭐
54 Rivas Manuhutu ⭐
56 Kyano Penso ⭐
58 Ezechiel Loan Siani Emaga ⭐
59 Jorvimar Mikeas Jomar Martina ⭐
60 Sébastien Ditmer ⭐
⚙️ MID
10 Paul Wanner
20 Guus Til
21 Sven Mijnans
24 Kodai Sano
35 Ayoni Santos ⭐
31 Noah Fernandez ⭐
37 Amir Bouhamdi ⭐
42 Shuryjano Cornecion ⭐
47 Boet Mulders ⭐
50 Gino Verhulst ⭐
52 Jaden de Guzman ⭐
62 Loek Schakenraad ⭐
⚡ FWD
5 Ivan Perišić
7 Ruben van Bommel
9 Ricardo Pepi
11 Sami Ouaissa
14 Alassane Pléa
19 Esmir Bajraktarević
27 Dennis Man
29 Sam Lammers
33 Manuel Bahaty ⭐
34 Jairo Beerens ⭐
43 Austyn Jones ⭐
44 Fabio Kluit ⭐
55 Liam van Nistelrooij ⭐
57 Samuel Dumbili ⭐
Manager: Peter Bosz.
🔄 Important PSV transfer correction
Ismaël Saibari ❌ PSV → Bayern München ✅ — Bayern officially confirmed the signing, so he should NOT be in your PSV 2026/27 squad.
Also, current UEFA squad confirms Geertruida is now at PSV, while Joey Veerman is no longer there and is with Feyenoord
🇳🇴 Viking FK — 2026/27 UCL
🧤 GK
1 Arild Østbø
12 Erlend Jacobsen
30 Ľubomír Belko
🛡️ DEF
2 Herman Haugen
3 Viljar Vevatne
4 Martin Ove Roseth
5 Henrik Heggheim
6 Gianni Stensness
17 Essiën Bassey
18 Sondre Bjørshol
21 Anders Baertelsen
24 Vetle Auklend ⭐
25 Henrik Falchener
27 Jesper Daland
28 Kristoffer Haugen
⚙️ MID
7 Kristoffer Askildsen
8 Joe Bell
10 Zlatko Tripić
15 Ola Visted ⭐
16 Henrik Bjørdal
19 Amin Cosic
29 Tobias Moi ⭐
33 Jakob Hansen ⭐
⚡ FWD
9 Nick D'Agostino
11 Romano Postema
14 Veton Berisha
20 Peter Christiansen
22 Erik Botheim
23 Niklas Fuglestad ⭐
26 Simen Kvia-Egeskog
Coach: Bjarte Lunde Aarsheim
UEFA also identifies Morten Jensen as part of the coaching partnership.
⭐ = UEFA List B.
🔥 Major 2026 signing: Erik Botheim — returned to Norway after his previous spell with Bodø/Glimt.
🇳🇴 Bodø/Glimt — 2026/27 UCL
🧤 GK
1 Julian Faye Lund
12 Nikita Haikin
43 Martin Lund Andersen ⭐
45 Isak Sjong ⭐
🛡️ DEF
2 Villads Nielsen
4 Odin Bjørtuft
5 Haitam Aleesami
6 Jostein Gundersen
15 Fredrik Bjørkan
35 Matias Jaiteh ⭐
36 Mathias Blix Olsen ⭐
⚙️ MID
7 Patrick Berg
8 Sondre Auklend
14 Ulrik Saltnes
16 Joshua Kitolano
19 Sondre Brunstad Fet
20 Fredrik Sjøvold
23 Magnus Riisnæs
26 Håkon Evjen
28 Assan Sanyang
32 Kasper Solhaug ⭐
33 Levi Monsen Yeboah ⭐
34 Erling Eliassen ⭐
37 Jesper Rabben Nygård ⭐
94 August Mikkelsen
⚡ FWD
9 Andreas Helmersen
10 Jens Petter Hauge
11 Ole Didrik Blomberg
17 Ola Brynhildsen
22 Joel Mvuka
25 Isak Määttä
31 Hindrin Chooly ⭐
Coach: Kjetil Knutsen.
⭐ = UEFA List B.
🔥 Key players
Patrick Berg
Jens Petter Hauge
Andreas Helmersen
Ole Didrik Blomberg
Ola Brynhildsen
UEFA specifically identifies Patrick Berg as Bodø/Glimt's key player for this Champions League campaign.
🇵🇹 SPORTING CP
Manager: Rui Borges
🧤 GK
1 Rui Silva
30 Kaique Pereira
41 Diego Callai
46 William Lodmell*
51 Miguel Gouveia*
74 Guilherme Pires*
99 Francisco Silva*
🛡️ DEF
5 Sergi Altimira
6 Zeno Debast
13 Giorgos Vagiannidis
18 Moncef Zekri*
22 Iván Fresneda
25 Gonçalo Inácio
55 Ibrahima Ba
72 Eduardo Quaresma
39 Francisco Cabeçana*
43 João Muniz*
45 Diego Coxi*
48 João Rijo*
50 Amores Dias*
54 Bruno Ramos*
64 Andre Machado*
66 Miguel Alves*
68 Daniel Costa*
70 Salvador Blopa*
71 Denilson Santos*
79 Daniel Ciesielski*
84 Atanásio*
85 Rafael Mota*
86 Afonso Lee*
92 Duarte Tomás*
95 Lucas Dominguez*
🎯 MID
4 Silas Andersen
17 Rodrigo Zalazar
20 Maximiliano Araújo
21 Pedro Lima
77 Issa Doumbia
96 Samuel Justo
8 João Simões*
47 Micael Sanhá*
53 Diego Farinha*
56 Rayhan Momade*
58 Flávio Gonçalves*
61 Sandro Gambôa*
62 Ivanildo Mendes*
63 Rafael Camacho*
65 Martim Almeida*
73 Eduardo Felicíssimo*
75 Victor Bastianele*
89 Leonardo Varela*
⚡ FWD
7 Fotis Ioannidis
10 Geny Catamo
11 Nuno Santos
19 Nestory Irankunda
28 Jesse Derry
31 Luis Guilherme
97 Luis Suárez
9 Rafael Nel*
57 Chris Grombahi*
76 Rodrigo Rodrigues*
78 Mauro Couto*
81 Sandro Ferreira*
82 Gabriel Silva*
91 Miguel Almeida*
98 Martim Ribeiro*
UEFA's current Sporting squad lists Rui Borges as coach and confirms these registered players.
🇵🇹 FC PORTO
Manager: Francesco Farioli
🧤 GK
14 Cláudio Ramos
24 João Costa
50 João Afonso
91 Gonçalo Ribeiro*
99 Diogo Costa
🛡️ DEF
4 Jakub Kiwior
5 Jan Bednarek
12 Zaidu Sanusi
18 Nehuén Pérez
20 Alberto Costa
33 Souza
74 Francisco Moura
52 Martim Fernandes*
64 Luis Gomes*
84 Martim Cunha*
94 Martim Chelmik*
🎯 MID
8 Victor Froholdt
13 Pablo Rosario
16 Inbeom Hwang
22 Alan Varela
42 Seko Fofana
58 Tiago Silva*
66 Bernardo Lima*
92 João Teixeira*
⚡ FWD
7 William Gomes
9 Samu
10 Gabriel Veiga
11 Pepê
17 Borja Sainz
19 André Silva
29 Santiago Giménez
57 Duarte Cunha*
72 André Miranda*
77 Oskar Pietuszewski
89 Mateus Mide*
UEFA's current 2026/27 Porto squad confirms Diogo Costa, Kiwior, Bednarek, Nehuén Pérez, Froholdt, Hwang, Varela, Fofana, Gabriel Veiga, Pepê, Samu, Giménez and the other registered players above.
🇸🇰 ŠK SLOVAN BRATISLAVA
🧤 GK
1 Aleksandar Popović
32 Dávid Balog*
44 Matúš Macík
71 Dominik Takáč
🛡️ DEF
2 Samuel Kozlovský
6 Kevin Wimmer
12 Kenan Bajrić
15 Svetozar Marković
24 Matúš Tomáško*
26 Robert Tománek*
28 César Blackman
49 Sahmkou Camara
57 Sandro Cruz
🎯 MID
3 Peter Pokorný
5 Rahim Ibrahim
7 Leo Hofstädter*
8 Artur Gajdoš
11 Tigran Barseghyan
20 Alen Mustafić
70 Cristian Martínez
77 Danylo Ihnatenko
88 Daiki Matsuoka
⚡ FWD
10 Nino Marcelli*
13 Roman Čerepkai
14 Alasana Yirajang
21 Suleiman Camara
29 Alexej Maroš*
99 Andraž Šporar
👔 Manager
Yaya Touré 🇨🇮
Key players: Tigran Barseghyan, Andraž Šporar, César Blackman, Sandro Cruz. UEFA's current squad page confirms the registered list above
🇹🇷 GALATASARAY
Manager: Okan Buruk
🧤 GK
1 Uğurcan Çakır
19 Günay Güvenç
24 Jankat Yılmaz
70 Enes Büyük
🛡️ DEF
3 El Chadaille Bitshiabu
4 Ismail Jakobs
6 Davinson Sánchez
7 Roland Sallai
17 Eren Elmalı
42 Abdülkerim Bardakcı
64 Yusuf Kahraman*
71 Cihan Akgün*
90 Wilfried Singo
🎯 MID
8 Gabriel Sara
18 Lesley Ugochukwu
20 İlkay Gündoğan
34 Lucas Torreira
57 Necati Yançel*
67 Eyüp Karasu*
68 Furkan Koçak*
73 Berat Luş*
74 Renato Nhaga
76 Onur Kağan Yıldız*
83 Aleksei Batrakov
99 Mario Lemina
⚡ FWD
10 Leroy Sané
11 Yunus Akgün
21 Deniz Gül
27 Rafael Leão
45 Victor Osimhen
51 Arda Tagay*
53 Barış Alper Yılmaz
62 Ada Yüzgeç*
🇹🇷 FENERBAHÇE
Manager: İsmail Kartal
🧤 GK
13 Tarık Çetin
31 Ederson
34 Mert Günok
75 Kuzey Sapaz*
89 Yasir Caklı*
🛡️ DEF
14 Yiğit Efe Demir
15 Nathan Aké
18 Mert Müldür
21 Kojo Peprah Oppong
27 Nélson Semedo
37 Milan Škriniar
77 Ognjen Mimović
78 Çağan Sarıdikmen*
82 Bedirhan Korkmaz*
86 Gökmen Özdemir*
🎯 MID
3 Archie Brown
5 İsmail Yüksek
6 Mattéo Guendouzi
17 İrfan Can Kahveci
22 Levent Mercan
28 Bartuğ Elmaz
70 Oğuz Aydın
80 Efe Fettahoğlu*
84 Emin Sayar*
85 Güner Ekici*
90 Emirhan Ateş*
91 N'Golo Kanté
⚡ FWD
7 Kerem Aktürkoğlu
9 Romelu Lukaku
10 Marco Asensio
11 Mason Greenwood
19 Vedat Muriqi
45 Dorgeles Nene
54 Alaettin Ekici*
🇺🇦 SHAKHTAR DONETSK
Manager: Arda Turan
🧤 GK
23 Kiril Fesiun
31 Dmytro Riznyk
34 Rostyslav Bahlai*
🛡️ DEF
4 Marlon Santos
5 Valeriy Bondar
13 Pedro Henrique
16 Irakli Azarov
17 Vinícius Tobías
18 Alaa Ghram
20 Oleksandr Karavaiev
22 Mykola Matviyenko
🎯 MID
6 Marlon Gomes
8 Dmytro Kryskiv
10 Pedrinho
11 Newertton*
14 Isaque
24 Viktor Tsukanov*
25 Gabriel Carvalho
27 Oleh Ocheretko
29 Yehor Nazaryna
30 Alisson Santana
37 Lucas Ferreira
45 Denys Smetana*
71 Ryan Roberto
77 Gleiker Mendoza
99 Bruninho
⚡ FWD
2 Lassina Traoré
9 Kauã Elias
49 Luca Meirelles
UEFA confirms Arda Turan as Shakhtar coach and lists Pedrinho as their key player; Bruninho was their major summer signing
`;

fs.writeFileSync('raw_squads.txt', rawText, 'utf-8');
console.log('Saved raw squads');
