'use strict';



module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op

    const tracksArr = await queryInterface.sequelize.query(
      'SELECT id,title FROM "Tracks" WHERE "seedGenerated"=true ', {
      type: queryInterface.sequelize.QueryTypes.SELECT
    })
    const users = await queryInterface.sequelize.query(
      'SELECT id FROM "Users" WHERE "seedGenerated"=true ', {
      type: queryInterface.sequelize.QueryTypes.SELECT
    })

    const tracksObj = {}
    tracksArr.forEach(track => {
      tracksObj[track.title] = track.id
    });

    const defaultAnnos = [
      {
        trackId: tracksObj['I Wanna Be Adored'],
        userId: users[0].id,
        annotation: `A lucid album opener spearheaded by the hushed ringing vocal of Ian Brown, repeating selected lines of lyrics throughout the entire song.
        The song is a mea culpa to fans of the band who criticized the band for signing to a major label, with Ian Brown effectively claiming that the group did so in order to reach a wider audience via the resources of his new label.`,
        lyric: null,
        seedGenerated: true,
      },
      {
        trackId: tracksObj['I Wanna Be Adored'],
        userId: users[0].id,
        annotation: `Like Patti Smith’s “Gloria (In Excelsis Deo),” this starts the album off with a huge theological claim – the conception of “original sin” suggests that man is born evil and must choose goodness. The Devil is already within, hence he has no need to sell his soul.`,
        lyric: `I don’t have to sell my soul
        He’s already in me
        I don’t need to sell my soul
        He’s already in me`,
        seedGenerated: true,
      },
      {
        trackId: tracksObj['I Wanna Be Adored'],
        userId: users[0].id,
        annotation: `Furthering the religious theme set out in the selling of souls, the adoration is no longer reserved for god alone. This is what is ‘evil’, the need for self-adoration`,
        lyric: `I wanna be adored
        I wanna be adored`,
        seedGenerated: true,
      },
      {
        trackId: tracksObj['I Wanna Be Adored'],
        userId: users[0].id,
        annotation: `Furthering the religious theme set out in the selling of souls, the adoration is no longer reserved for god alone. This is what is ‘evil’, the need for self-adoration`,
        lyric: `Wanna
        I wanna, I wanna be adored
        I wanna, I wanna, I wanna be adored
        I wanna, I wanna, I gotta be adored`,
        seedGenerated: true,
      },
      {
        trackId: tracksObj['Walk on the Wild Side'],
        userId: users[1].id,
        annotation: `Lou Reed’s “Walk on the Wild Side” is a tribute to Andy Warhol’s “factory” of friends and superstars from the New York underground.

        The song weaves a soft, soothing melody with lyrics about about drugs, transsexuality, cross-dressing, prostitution, and oral sex.
        The title is a reference to Nelson Algren’s 1956 novel “A Walk on the Wild Side”. Reed was hired to create a musical based on the novel, which had previously been turned into a film with a screenplay written by noted author John Fante. The project never came to fruition, and Reed used the title of the novel for the now famous glamour track.`,
        lyric: null,
        seedGenerated: true,
      },
      {
        trackId: tracksObj['Walk on the Wild Side'],
        userId: users[1].id,
        annotation: ` This story is about Holly Woodlawn, a transgender actress and former Warhol superstar, who appeared in Warhol movies such as Trash (1970) and Women in Revolt (1972) and became one of the first American transgender celebrities..
        According to her autobiography, A Low Life in High Heels, Holly Woodlawn ran away from her home in Miami, Florida, for New York City after her parents discovered she was a gay man (not yet a transgender woman). In 1963, at the age of fifteen, Holly took a Greyhound bus to Georgia and then hitchhiked the rest of the way to New York City.`,
        lyric: `Holly came from Miami, FLA
        Hitchhiked her way across the U.S.A
        Plucked her eyebrows on the way
        Shaved her legs and then he was a she`,
        seedGenerated: true,
      },
      {
        trackId: tracksObj['Walk on the Wild Side'],
        userId: users[2].id,
        annotation: `Holly is coaxing gentleman callers to experience, “The Wild Side”… A back alley subculture full of transgender persons, found in the streets of 1970’s New York City. Much of this lifestyle was prevalent in Andy Warhol’s art studio, titled, “The Factory”.`,
        lyric: `She says, "Hey, babe, take a walk on the wild side"
        Said, "Hey honey, take a walk on the wild side"`,
        seedGenerated: true,
      },
      {
        trackId: tracksObj['Walk on the Wild Side'],
        userId: users[2].id,
        annotation: `Candy Darling was an American actress, and the second best Warhol Superstar referenced in the song. She spent a good portion of her life on Long Island and as a transgender woman, starred in Andy Warhol’s films Flesh (1968) and Women in Revolt (1971).
        Notice that the first and last words in the couplet form her name. Also a reference to her performing sexual favors at clubs, presumably after shows.
        She was also a muse of the Lou Reed’s legendary protopunk band The Velvet Underground and was the subject of their song, “Candy Says.” According to Reed, she liked being sung in his songs:
        "Candy Darling told me [s]he’d memorised all the songs and wanted to make a ‘Candy Darling Sings Lou Reed’ album. It probably wouldn’t sell more than a hundred copies!”.
        She died of lymphoma in 1974.`,
        lyric: `Candy came from out on the Island
        In the backroom, she was everybody's darling`,
        seedGenerated: true,
      },
      {
        trackId: tracksObj['Walk on the Wild Side'],
        userId: users[2].id,
        annotation: `Little wordplay with the expressions “lose one’s head” (to lose control) and to “give head” (perform oral sex).
        This obvious reference to oral sex, caused a stir in England when it was released. The censors at the BBC were unaware of the American slang term “giving head” and so didn’t censor it from the song. Lou’s fans did catch the reference, and the fact that it got by the censors and on air was like an inside joke to British fans.`,
        lyric: `But she never lost her head
        Even when she was giving head`,
        seedGenerated: true,
      },
      {
        trackId: tracksObj['Walk on the Wild Side'],
        userId: users[2].id,
        annotation: `This is a reference to the scat-singing filled hits from the Motown girl groups of the sixties – artists like The Supremes or Martha and the Vandellas.
        Depending on the regional US market, the song was edited for what we now call political correctness. Some stations played a version that replaced the phrase with, “And the girls all say.”`,
        lyric: `And the colored girls go
        Doo, doo-doo, doo-doo, doo-doo-doo
        Doo, doo-doo, doo-doo, doo-doo-doo
        Doo, doo-doo, doo-doo, doo-doo-doo
        Doo, doo-doo, doo-doo, doo-doo-doo`,
        seedGenerated: true,
      },
      {
        trackId: tracksObj['Walk on the Wild Side'],
        userId: users[2].id,
        annotation: `Female trio Thunderthighs provided these backing vocals: Dari Lallou, Karen Friedman, and Casey Synge.
        They’re not “colored”. They’re white and British. Lou Reed is rarely on-the-nose like that.`,
        lyric: `(Doo, doo-doo, doo-doo, doo-doo-doo
          Doo, doo-doo, doo-doo, doo-doo-doo
          Doo, doo-doo, doo-doo, doo-doo-doo
          Doo, doo-doo, doo-doo, doo-doo-doo
          Dooh)`,
        seedGenerated: true,
      },
      {
        trackId: tracksObj['Walk on the Wild Side'],
        userId: users[2].id,
        annotation: `The third Warhol superstar referenced in the song, Joe Dallesandro, never became a major film star. But he is generally considered to be the most famous male sex symbol of American underground films of the 20th century, as well as a sex symbol of gay subculture.
        Joe Dallesandro’s crotch made an appearance on the cover art for The Rolling Stones album Sticky Fingers, designed by Andy Warhol
        The Smiths‘ debut album also used an image of Dallesandro as a cover – part of a photogram from Warhol’s 1968 movie Flesh.`,
        lyric: `Little Joe never once gave it away`,
        seedGenerated: true,
      },
      {
        trackId: tracksObj['Walk on the Wild Side'],
        userId: users[2].id,
        annotation: `Unlike most other people sung in the song, “Little Joe” is not actually based on the real life Joe Dallesandro himself, but rather on the character he played on most of Wathol’s movies. Particularly in Flesh (1968), in which
        Dallesandro plays a hustler.
        Flesh became a crossover hit with mainstream audiences, and Dallesandro became the most popular of the Warhol stars. New York Times film critic Vincent Canby wrote of him:
        “His physique is so magnificently shaped that men as well as women become disconnected at the sight of him.”`,
        lyric: `Everybody had to pay and pay
        A hustle here and a hustle there`,
        seedGenerated: true,
      },
      {
        trackId: tracksObj['Walk on the Wild Side'],
        userId: users[2].id,
        annotation: `Joe Campbell became known as Sugar Plum Fairy after his character in Warhol’s 1965 movie My Hustler.
        Campbell has an interesting story outside the Warhol circle:
        “In 1955, he entered into a love affair with an older man, with whom he lived for seven years – that older man, Harvey Milk, would later find fame as the highest profile gay politician in the US. His late 60s boyfriend, Billy Sipple, became famous in September 1975, when he thwarted Sara Jane Moore’s attempt to shoot Gerald Ford. Campbell himself died at home in California in 2005, after 29 years of a relationship with Stanley Jensen”.`,
        lyric: `Sugar Plum Fairy came and hit the streets`,
        seedGenerated: true,
      },
      {
        trackId: tracksObj['Walk on the Wild Side'],
        userId: users[2].id,
        annotation: `Soul food and the Apollo Theatre – two of Harlem’s greatest treasures
        It is widely speculated that this verse is related to drugs: some say “Sugar Plum Fairy” was the nickname of a drug dealer in the factory circle. Others that the character in the song is looking to score drugs uptown in Harlem and “soul food” would be a codeword for that.`,
        lyric: `Looking for soul food and a place to eat
        Went to the Apollo`,
        seedGenerated: true,
      },
      {
        trackId: tracksObj['Walk on the Wild Side'],
        userId: users[3].id,
        annotation: `Jackie Curtis, drag queen who hung out in Andy Warhol’s Factory.
        “She sometimes performed as a woman, sometimes as a man, and her glitter-and-lipstick style was claimed to have been an inspiration to the glam-rock look. She wrote musicals and poetry, and sang – and her 1967 play Glory, Glamour and Gold gave Robert de Niro his first stage role.”`,
        lyric: `Jackie`,
        seedGenerated: true,
      },
      {
        trackId: tracksObj['Walk on the Wild Side'],
        userId: users[3].id,
        annotation: `The obvious wordplay is between the use of amphetamines (AKA speed) as a recreative drug and speeding as in driving fast in a car.
        James Dean not only starred in one of the most glamorous scenes of teenagers speeding, but he also died in a car crash on September 30, 1955.
        The lyrics imply that Curtis use of amphetamines (and other drugs) was as dangerous as Dean’s reckless driving. She eventually passed away from a heroin overdose at the age of 38.
        Both Curtis' and Dean’s stage/film personas and their real life personalities blurred the line between fact and fiction.`,
        lyric: `is just speeding away
        Thought she was James Dean for a day`,
        seedGenerated: true,
      },
      {
        trackId: tracksObj['Walk on the Wild Side'],
        userId: users[3].id,
        annotation: `Keeping up with the car / drugs parallels.
        Jackie was coming down off a amphetamine (speed) high and needed to sleep (crash), the sedative drug Valium helps a person on amphetamine (speed) be able to sleep (crash)
        As described in “Popism: The Warhol Sixties”, some of the first drag queens who became part of Warhol’s crowd found their way into the Factory scene by selling Valium to the “Speed Freaks” who hung out around Warhol and the Velvets.`,
        lyric: `Then I guess that she had to crash
        Valium would have helped that bash`,
        seedGenerated: true,
      },
      {
        trackId: tracksObj['Walk on the Wild Side'],
        userId: users[3].id,
        annotation: `Performed by Ronnie Ross on a baritone saxophone. Ronnie taught David Bowie (who produced the track) how to play sax during Bowie’s childhood.`,
        lyric: `[Saxophone Solo]`,
        seedGenerated: true,
      },
      {
        trackId: tracksObj['Rhinestone Eyes'],
        userId: users[4].id,
        annotation: `“Rhinestone Eyes” was intended to be the fourth and single from British alternative band Gorillaz’s third studio album, Plastic Beach (2010,) but was replaced by Doncamatic
        The song samples the unreleased Gorillaz demo “Electric Shock”.`,
        lyric: null,
        seedGenerated: true,
      },
      {
        trackId: tracksObj['Rhinestone Eyes'],
        userId: users[4].id,
        annotation: `He considers himself a scary gargoyle on a tower which is very peculiar. Gargoyles are inanimate objects, but the way in which they are fashioned gives them a haunting aura. Being in a tower might portray that the protagonist is distant and numb to those around him. Additionally, the tower “that you made with plastic power" refers to Plastic Beach, since it is made of all sorts of plastic waste.
        It’s also worth noting that a gargoyle (Pazuzu) can indeed be seen in the storyboard animatic for the scrapped “Rhinestone Eyes” music video.
        The line “Your rhinestone eyes are like factories far away” can be broken down like so:
        Rhinestone is a diamond simulant— usually meant to look nicer or more expensive than it is. It’s a sign of cheap materialism, fitting in with the theme of Plastic Beach as a whole. Rhinestones are also considered a good substitute for diamonds because of their shine, which are akin to teary eyes.
        Further, saying that their ‘rhinestone eyes’ are like factories could be referencing how the emotions they show are manufactured and polluting.`,
        lyric: `I'm a scary gargoyle on a tower
        That you made with plastic power
        Your rhinestone eyes are like factories far away`,
        seedGenerated: true,
      },
      {
        trackId: tracksObj['Rhinestone Eyes'],
        userId: users[4].id,
        annotation: `The dreams that everyone have where they want lots of material things (latest phones and cars) actually force people that are far away into poverty where they have to work crippling hours for little wage in “factories far away” (sweatshops).`,
        lyric: `Where the paralytic dreams that we all seem to keep
        Drive on engines till they weep
        With future pixels in factories far away`,
        seedGenerated: true,
      },
      {
        trackId: tracksObj['Rhinestone Eyes'],
        userId: users[4].id,
        annotation: `Bleach is washing up on shore and the ocean level is rising, signs of global warming and pollution`,
        lyric: `So call the mainland from the beach
        Your heart is now washed up in bleach
        The waves are rising for this time of year`,
        seedGenerated: true,
      },
      {
        trackId: tracksObj['Rhinestone Eyes'],
        userId: users[4].id,
        annotation: `Global warming is spreading about the world, and acid rain is falling.`,
        lyric: `And nobody knows what to do with the heat
        Under sunshine pylons, we'll meet
        While rain is falling like rhinestones from the sky`,
        seedGenerated: true,
      },
      {
        trackId: tracksObj['Rhinestone Eyes'],
        userId: users[4].id,
        annotation: `2D is singing about how all the verses of supposedly the album, Plastic Beach, and how they are hard to overcome and have stuck in his soul refusing to leave, or ‘obstinate’.`,
        lyric: `All the bowses and the growses
        Have been abstinated in my soul`,
        seedGenerated: true,
      },
      {
        trackId: tracksObj['Rhinestone Eyes'],
        userId: users[4].id,
        annotation: `The narrator has been praying on his knees in nature, something that seems unmovable and eternal, but awakes in the song to find his paradise has been disintegrated. He remains in his place, clinging to what little he can find of his “rock”, the nature that literally and figuratively kept him centered in a world of consumerism.
        We see nature as being an unmovable force, one that will always be there even as we continuously eat up the land and natural resources to make more plastic. Eventually, something that we saw as permanent, like a rock, will be gone – eaten up by consumers.`,
        lyric: `I prayed on the immovable
        Yet clinging to the atoms of rock`,
        seedGenerated: true,
      },
      {
        trackId: tracksObj['Rhinestone Eyes'],
        userId: users[4].id,
        annotation: `This could be 2D saying that despite everything that’s happened between him and Murdoc, like how Murdoc captured him and sent him to plastic beach, 2D is still very loyal to Murdoc and looks up to him. It could also be saying that whilst on plastic beach 2D is still also loyal to Murdoc and does what he says.
        The line can also be interpreted as a difficult situation bringing unlikely allies together – people who usually wouldn’t give each other the light of day.`,
        lyric: `This dawn brings strange loyalties and skies`,
        seedGenerated: true,
      },
      {
        trackId: tracksObj['Rhinestone Eyes'],
        userId: users[4].id,
        annotation: `This line talks about how, as stated from a previous line, factories far away are likely creating or using up electricity. It’s talking about all of the things that are electric in the world.
        Fun fact: This line is sampled from an unreleased Gorillaz track entitled “Electric Shock”.
        A similar lyric can be found in fellow Plastic Beach single “Stylo”,— “electric is the love”.`,
        lyric: `That's electric`,
        seedGenerated: true,
      },
      {
        trackId: tracksObj['Rhinestone Eyes'],
        userId: users[5].id,
        annotation: `Everyone is under control by routine, and that you are expected to go to school then get a job then retire just like everyone else, and the ones in control are prepared to use violence against anyone who chooses not to follow this routine.
        Helicopters have been used by Gorillaz antagonists before, notably in the El Mañana music video.`,
        lyric: `Helicopters fly over the beach
        Same time every day, same routine`,
        seedGenerated: true,
      },

      {
        trackId: tracksObj['Rhinestone Eyes'],
        userId: users[5].id,
        annotation: `The Gorillaz characters have often come under attack from their enemies in various music videos, such as El Manana, and On Melancholy Hill. Here, 2D could be reflecting on the fact that, even on the undiscovered Plastic Beach, they won’t be safe for long.
        Might also mean that those who stand out from the rest, those who wish to challenge the system, are easy to spot, hence “the skies are blue”, since we often use the term “clear as the blue sky”.
        Some believe this line to be describing part of 2D’s unfortunate routine. Assuming he’s been trained to get rid of these enemies in helicopters, this line seems to see 2D nonchalantly explaining that the helicopters are clear targets (to shoot down) in summer when skies are blue, since there’s no clouds to get in the way of his aim.
        Additionally, he may be saying the target is not the helicopters, but the beach itself.
        May also be hinting at chemtrails corrupting the clear sky.`,
        lyric: `A clear target in the summer when skies are blue`,
        seedGenerated: true,
      },

      {
        trackId: tracksObj['Rhinestone Eyes'],
        userId: users[5].id,
        annotation: `The noise of the helicopters and mechanization becomes a part of him, while nature has become scattered and ruined.`,
        lyric: `It's part of the noise when winter comes
        It reverberates in my lungs
        Nature's corrupted in factories far away`,
        seedGenerated: true,
      },

      {
        trackId: tracksObj['Rhinestone Eyes'],
        userId: users[5].id,
        annotation: `The love that you have to give is plentiful, but it’s as fake as rhinestones. So in a way, it’s really worthless. One could also interpret falling rhinestones as tears coming from someone’s eyes.`,
        lyric: `Your love's like rhinestones falling from the sky (uh)`,
        seedGenerated: true,
      }
    ]

    return queryInterface.bulkInsert('Annotations', defaultAnnos, {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op
    return queryInterface.bulkDelete('Annotations', {
      seedGenerated: true
    }, {});
  }
};
