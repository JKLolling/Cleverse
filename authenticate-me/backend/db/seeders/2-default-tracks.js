'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {


    const defaultTracks = [
      {
        lyrics:
          `[Verse 1]
    Under the street light, under my skin
    Sha la la la (sha la la la!)
    Shouldn't have done that thing that you did
    Sha la la la (sha la la la!)
    Wipe up your tears and that bloody nose
    Sha la la la (sha la la la!)
    Go buy a record, some discount clothes
    Sha la la la (sha la la)

    [Chorus]
    Just because you took the easy way out
    Doesn't mean you know what you're talking about

    [Verse 2]
    Your daddy made it home from the war
    Sha la la la (sha la la la!)
    Now you're knocking on his best friend's door
    Sha la la la (sha la la la!)
    Tell me what to swallow, what to do
    Sha la la la (sha la la la!)
    Get off'a your sofa, and turn off the news
    Sha la la la (sha la la)

    [Chorus] (2x)
    Just because you took the easy way out
           Doesn't mean you know what you're talking about`,
        title: 'Hippie Soldier',
        band: 'Orwells',
        albumTitle: 'Terrible Human Beings',
        albumCover: '/images/seedPhotos/Hippie_Soldier.jpg',
        seedGenerated: true,
      },
      {
        lyrics:
          `[Verse 1]
        I don’t have to sell my soul
        He’s already in me
        I don’t need to sell my soul
        He’s already in me

        [Chorus]
        I wanna be adored
        I wanna be adored

        [Verse 1]
        I don’t have to sell my soul
        He’s already in me
        I don’t need to sell my soul
        He’s already in me

        [Chorus]
        I wanna be adored
        I wanna be adored

        [Chorus]
        Adored
        I wanna be adored

        [Verse 2]
        You adore me
        You adore me
        You adore me, I wanna, I wanna
        I wanna be adored

        [Verse 3]
        Wanna
        I wanna, I wanna be adored
        I wanna, I wanna, I wanna be adored
        I wanna, I wanna, I gotta be adored

        [Outro]
        I wanna be adored`,
        title: 'I Wanna Be Adored',
        band: 'The Stone Roses',
        albumTitle: 'The Stone Roses',
        albumCover: '/images/seedPhotos/I_Wanna_Be_Adored.jpg',
        seedGenerated: true,
      },
      {
        lyrics:
          `[Verse 1]
          Hanging around, downtown by myself
          And I had so much time to sit and think about myself
          And then there she was, like double cherry pie
          Yeah, there she was, like disco super-fly

          [Chorus]
          I smell sex and candy here, mmm
          Who's that lounging in my chair? Mmm
          Who's that casting devious stares in my direction?
          Momma this surely is a dream, yeah
          Yeah, momma this surely is a dream, dig it

          [Verse 2]
          Hanging around, downtown by myself
          And I've had too much caffeine, and I was thinking about myself
          And then there she was, in platform double suede
          Yeah, there she was, like disco lemonade

          [Chorus]
          I smell sex and candy here, mmhmmm
          Who's that lounging in my chair? Mmhmmm
          Who's that casting devious stares in my direction?
          Momma this surely is a dream, yeah
          Yeah, momma this surely is a dream, dig it
          Yeah, momma this surely is a dream, yeah

          [Chorus]
          I smell sex and candy here, mmhmmm
          Who's that lounging in my chair? Mmhmmm
          Who's that casting devious stares in my direction?
          Momma this surely is a dream, dig it
          Yeah, momma this surely is a dream, mmhmmm
          Yeah, momma this surely is a dream, yeah
          Yeah, momma this must be my dream`,
        title: 'Sex and Candy',
        band: 'Marcy Playground',
        albumTitle: 'Marcy Playground',
        albumCover: '/images/seedPhotos/Sex_and_Candy.jpg',
        seedGenerated: true,
      },
      {
        lyrics:
          `[Verse 1]
          I'm so tired of playing
          Playing with this bow and arrow
          Gonna give my heart away
          Leave it to the other girls to play
          For I've been a temptress too long
          Just...

          [Chorus]
          Give me a reason to love you
          Give me a reason to be a woman
          I just wanna be a woman

          [Verse 2]
          From this time, unchained
          We're all looking at a different picture
          Through this new frame of mind
          A thousand flowers could bloom
          Move over and give us some room, yeah

          [Chorus]
          Give me a reason to love you
          Give me a reason to be a woman
          I just wanna be a woman

          [Guitar Solo]

          [Verse 3]
          So don't you stop being a man
          Just take a little look
          From outside when you can
          Sow a little tenderness
          No matter if you cry

          [Chorus]
          Give me a reason to love you
          Give me a reason to be a woman
          I just wanna be a woman

          [Bridge]
          It's all I wanna be, is all, a woman
          For this is the beginning
          Of forever and ever
          It's time to move over
          It's all I wanna be

          [Outro]
          I'm so tired of playing
          Playing with this bow and arrow
          Gonna give my heart away
          Leave it to the other girls to play
          For I've been a temptress too long
          Just
          Give me a reason to love you`,
        title: 'Glory Box',
        band: 'Portishead',
        albumTitle: 'Dummy',
        albumCover: '/images/seedPhotos/Glory_Box.jpg',
        seedGenerated: true,
      },
      {
        lyrics:
          `[Verse 1]
          I fly like paper, get high like planes
          If you catch me at the border I got visas in my name
          If you come around here, I make 'em all day
          I get one done in a second if you wait
          I fly like paper, get high like planes
          If you catch me at the border I got visas in my name
          If you come around here, I make 'em all day
          I get one done in a second if you wait
          Sometimes I think sittin' on trains
          Every stop I get to I'm clocking that game
          Everyone's a winner, we're making our fame
          Bona fide hustler making my name
          Sometimes I think sittin' on trains
          Every stop I get to I'm clocking that game
          Everyone's a winner, we're making our fame
          Bona fide hustler making my name

          [Chorus]
          All I wanna do is–, and a–
          And take your money
          All I wanna do is–, and a–
          And take your money
          All I wanna do is–, and a–
          And take your money
          All I wanna do is–, and a–
          And take your money

          [Verse 2]
          Pirate skulls and bones
          Sticks and stones and weed and bongs
          Running when we hit 'em
          Lethal poison for the system
          Pirate skulls and bones
          Sticks and stones and weed and bongs
          Running when we hit 'em
          Lethal poison for the system
          No one on the corner has swagger like us
          Hit me on my burner prepaid wireless
          We pack and deliver like UPS trucks
          Already going hard, just pumping that gas
          No one on the corner has swagger like us
          Hit me on my burner prepaid wireless
          We pack and deliver like UPS trucks
          Already going hard, just pumping that gas

          [Chorus]
          All I wanna do is–, and a–
          And take your money
          All I wanna do is–, and a–
          And take your money
          All I wanna do is–, and a–
          And take your money
          All I wanna do is–, and a–
          And take your money

          [Bridge]
          M.I.A, third world democracy
          Yeah, I've got more records than the KGB
          So, uh, no funny business (Are you ready all?)
          Some some some I some I murder
          Some I some I let go
          Some some some I some I murder
          Some I some I let go

          [Chorus]
          All I wanna do is–, and a–
          And take your money
          All I wanna do is–, and a–
          And take your money
          All I wanna do is–, and a–
          And take your money
          All I wanna do is–, and a–
          And take your money`,
        title: 'Paper Planes',
        band: 'M.I.A.',
        albumTitle: 'Kala',
        albumCover: '/images/seedPhotos/Paper_Planes.jpg',
        seedGenerated: true,
      },
      {
        lyrics:
          `[Verse 1]
          Holly came from Miami, FLA
          Hitchhiked her way across the U.S.A
          Plucked her eyebrows on the way
          Shaved her legs and then he was a she

          [Chorus]
          She says, "Hey, babe, take a walk on the wild side"
          Said, "Hey honey, take a walk on the wild side"

          [Verse 2]
          Candy came from out on the Island
          In the backroom, she was everybody's darling
          But she never lost her head
          Even when she was giving head

          [Chorus]
          She says, "Hey, babe, take a walk on the wild side"
          Said, "Hey, babe, take a walk on the wild side"

          [Post Chorus]
          And the colored girls go
          Doo, doo-doo, doo-doo, doo-doo-doo
          Doo, doo-doo, doo-doo, doo-doo-doo
          Doo, doo-doo, doo-doo, doo-doo-doo
          Doo, doo-doo, doo-doo, doo-doo-doo
          (Doo, doo-doo, doo-doo, doo-doo-doo
          Doo, doo-doo, doo-doo, doo-doo-doo
          Doo, doo-doo, doo-doo, doo-doo-doo
          Doo, doo-doo, doo-doo, doo-doo-doo
          Dooh)

          [Verse 3]
          Little Joe never once gave it away
          Everybody had to pay and pay
          A hustle here and a hustle there
          New York City is the place where they said

          [Chorus]
          "Hey babe, take a walk on the wild side"
          I said, "Hey Joe, take a walk on the wild side"

          [Verse 4]
          Sugar Plum Fairy came and hit the streets
          Looking for soul food and a place to eat
          Went to the Apollo
          You should have seen him go, go, go

          [Chorus]
          They said, "Hey sugar, take a walk on the wild side"
          I said, "Hey babe, take a walk on the wild side"
          Alright, huh

          [Verse 5]
          Jackie is just speeding away
          Thought she was James Dean for a day
          Then I guess that she had to crash
          Valium would have helped that bash

          [Chorus]
          She said, "Hey, babe, take a walk on the wild side"
          I said, "Hey honey, take a walk on the wild side"

          [Post Chorus]
          And the colored girls say
          Doo, doo-doo, doo-doo, doo-doo-doo
          Doo, doo-doo, doo-doo, doo-doo-doo
          Doo, doo-doo, doo-doo, doo-doo-doo
          Doo, doo-doo, doo-doo, doo-doo-doo
          (Doo, doo-doo, doo-doo, doo-doo-doo
          Doo, doo-doo, doo-doo, doo-doo-doo
          Doo, doo-doo, doo-doo, doo-doo-doo
          Doo, doo-doo, doo-doo, doo-doo-doo
          Doo, doo-doo, doo-doo, doo-doo-doo
          Doo, doo-doo, doo-doo, doo-doo-doo
          Doo, doo-doo, doo-doo, doo-doo-doo
          Doo, doo-doo, doo-doo, doo-doo-doo
          Dooh)

          [Saxophone Solo]`,
        title: 'Walk on the Wild Side',
        band: 'Lou Reed',
        albumTitle: 'Transformer',
        albumCover: '/images/seedPhotos/Walk_on_the_Wild_Side.jpg',
        seedGenerated: true,
      },
      {
        lyrics:
          `[Verse 1]
          I'm a scary gargoyle on a tower
          That you made with plastic power
          Your rhinestone eyes are like factories far away
          Where the paralytic dreams that we all seem to keep
          Drive on engines till they weep
          With future pixels in factories far away
          So call the mainland from the beach
          Your heart is now washed up in bleach
          The waves are rising for this time of year
          And nobody knows what to do with the heat
          Under sunshine pylons, we'll meet
          While rain is falling like rhinestones from the sky

          [Chorus]
          (Uh)
          (Mmmmm)

          [Verse 2]
          I can't see you now my heart is frozen
          All the bowses and the growses
          Have been abstinated in my soul
          I prayed on the immovable
          Yet clinging to the atoms of rock
          Seasons see adjustment signs of change
          I can't see now, she said, "Taxi"
          Now that light is all I can take
          This dawn brings strange loyalties and skies
          I'm a scary gargoyle on a tower
          That you made with plastic power
          Your rhinestone eyes are like factories far away

          [Chorus]
          (Here we go again)
          That's electric
          (Uh)
          That's electric

          [Verse 3]
          Helicopters fly over the beach
          Same time every day, same routine
          A clear target in the summer when skies are blue
          It's part of the noise when winter comes
          It reverberates in my lungs
          Nature's corrupted in factories far away

          [Chorus]
          (Here we go again)
          That's electric
          Your love's like rhinestones falling from the sky (uh)
          That's electric
          With future pixels in factories far away
          (Here we go again)
          That's electric
          Your love's like rhinestones falling from the sky (uh)
          That's electric
          With future pixels in factories far away
          (Here we go again)`,
        title: 'Rhinestone Eyes',
        band: 'Gorillaz',
        albumTitle: 'Plastic Beach',
        albumCover: '/images/seedPhotos/Rhinestone_Eyes.jpg',
        seedGenerated: true,
      },
      {
        lyrics:
          `[Verse 1]
          She grew up in an Indiana town
          Had a good lookin' mama who never was around
          But she grew up tall and she grew up right
          With them Indiana boys on them Indiana nights
          Well, she moved down here at the age of eighteen
          She blew the boys away, was more than they'd seen
          I was introduced and we both started groovin'
          She said, "I dig you baby, but I got to keep movin' on
          Keep movin' on"

          [Chorus]
          Last dance with Mary Jane, one more time to kill the pain
          I feel summer creepin' in and I'm tired of this town again

          [Verse 2]
          Well, I don't know, but I've been told
          You never slow down, you never grow old
          I'm tired of screwin' up, tired of going down
          Tired of myself, tired of this town

          [Refrain]
          Oh, my, my, oh, hell yes
          Honey, put on that party dress
          Buy me a drink, sing me a song
          Take me as I come 'cause I can't stay long

          [Chorus]
          Last dance with Mary Jane, one more time to kill the pain
          I feel summer creepin' in and I'm tired of this town again

          [Verse 3]
          There's pigeons down on Market Square
          She's standin' in her underwear
          Lookin' down from a hotel room
          The nightfall will be comin' soon

          [Refrain]
          Oh, my, my, oh, hell yes
          You got to put on that party dress
          It was too cold to cry when I woke up alone
          I hit my last number and walked to the road

          [Chorus]
          Last dance with Mary Jane, one more time to kill the pain
          I feel summer creepin' in and I'm tired of this town again`,
        title: 'Mary Jane\'s Last Dance',
        band: 'Tom Petty and the Heartbreakers',
        albumTitle: 'Tom Petty and the Heartbreakers: Greatest Hits (1993)',
        albumCover: "/images/seedPhotos/Mary_Jane's_Last_Dance.jpg",
        seedGenerated: true,
      },
      {
        lyrics:
          `[Verse 1: Nipsey Hussle]
          Pull up in motorcades, I got a show today
          This all I'm tryna do, hustle and motivate
          Choppers a throwaway, hustle the Hova way
          That's why they follow me, huh? They think I know the way
          'Cause I took control of things, ballin' the solo way
          And if you pattern my trend, I make you my protege
          Slauson Ave soldier raised, niggas don't know them days
          Take you in back of the buildings, make you expose your age
          Take you across the tracks, make you explode a face
          Now you official now, but you got a soul to save
          I just been cookin' that new, I'm 'bout to drop in a few
          Think if I call it the great, the people gon' call it the truth
          Ain't really trip on the credit, I just paid all of my dues
          I just respected the game, now my name all in the news
          Trippin' on all of my moves, quote me on this, got a lot more to prove
          Remember I came in this bitch fresh out the county with nothin' to lose

          [Chorus: Maurice David Wade]
          And I don't do this for nothin', nah, from the ground up, yeah
          But I don't do this shit for nothin', no, no, not at all, yeah
          My mama need rent, ma need rent, yeah, she do, aw yeah
          So I don't do this shit for nothin', no, not at all, all
          I told her I got it, oh, yeah
          So I don't do this shit for nothin', not at all, from the ground up
          Hustle and motivate (Woo)

          [Verse 2: Nipsey Hussle]
          Back in this bitch like I never left
          Stand for some shit that you never rep
          Passing through stages in life
          Through the ups and the downs like it's all just another test
          Live by the rules like a fuckin' ref
          I got respect in a hundred sets
          Too many chains, need another chest
          Playin' no games if it wasn't chess
          Cut from that cloth that you couldn't stretch
          Cut from that circle you couldn't test
          Heavily pressured and under stress
          Even though niggas ain't show it, we was a mess
          Honest attempt, play him to the left
          Judge a young nigga by they address
          Left us no option, what they expect?
          Only thing we knew for sure was to bang the set
          Fuck livin' basic, I'm takin' risks
          Fuck what they sayin', I'm sayin' this
          Don't waste your time, it don't make you rich
          It don't mean nothin', so fuck 'em, let's make a grip
          Double up, triple up, make it six
          Ballin' so hard, you could pay a bitch
          Lead to the lake if they wanna fish
          Make sure them niggas around you stick to the script
          This should be written in stone
          You should come visit my zone
          Don't take my word, double-check all of my flows
          Ask 'em how Hussle got on
          But fuck what you heard
          This is for who walked down that road
          Sold everything but they soul
          Straight off the curb, real niggas rich as you nerds
          Addressed to whom it may concern
          I don't do this for nothin', nah

          [Chorus: Maurice David Wade]
          From the ground up, yeah
          But I don't do this shit for nothin', no, no, not at all, yeah
          My mama need rent, ma need rent, yeah, she do, aw yeah
          So I don't do this shit for nothin', no, not at all, all
          I told her I got it, oh, yeah
          So I don't do this shit for nothin', not at all, from the ground up
          Hustle and motivate (Woo)


          [Outro: Maurice David Wade & Nipsey Hussle]
          Hustle and motivate, hustle and motiv— (Cut the bass out)
          Hustle and motiv—, hustle and motivate (All Money In, nigga)
          Hustle and motiv—, hustle and motiv—
          Hustle and motiv—, hustle and motivate
          (Victory Lap)`,
        title: 'Hustle & Motivate',
        band: 'Nipsey Hussle',
        albumTitle: 'Victory Lap',
        albumCover: '/images/seedPhotos/Hustle_&_Motivate.jpg',
        seedGenerated: true,
      },
      {
        lyrics:
          `[Verse 1]
          I didn't want to be the one to forget
          I thought of everything I'd never regret
          A little time with you is all that I get
          That's all we need because it's all we can take
          One thing I never see the same when you're 'round
          I don’t believe in him, his lips on the ground
          I wanna take you to that place in the Roche
          But no one gives us any time anymore
          He asks me once if I'd look in on his dog
          You made an offer for it, then you ran off
          I got this picture of us kids in my head
          And all I hear is the last thing that you said

          [Pre-Chorus]
          "I listened to your problems, now listen to mine"
          I didn't want to anymore, oh-oh-oh

          [Chorus]
          And we will never be alone again
          'Cause it doesn't happen every day
          Kinda counted on you being a friend
          Can I give it up or give it away?
          Now I thought about what I wanna say
          But I never really know where to go
          So I chained myself to a friend
          'Cause I know it unlocks like a door
          And we will never be alone again
          'Cause it doesn't happen every day
          Kinda counted on you being a friend
          Can I give it up or give it away?
          Now I thought about what I wanna say
          But I never really know where to go
          So I chained myself to a friend
          Some more again

          [Verse 2]
          It didn't matter what they wanted to see
          He thought he saw someone that looked just like me
          The summer memory that just never dies
          We worked too long and hard to give it no time
          He sees right through me, it's so easy with lies
          Cracks in the road that I would try and disguise
          He runs his scissors at the seam in the wall
          He cannot break it down or else he would fall
          One thousand lonely stars hiding in the cold
          Take it, oh, I don't wanna sing anymore

          [Instrumental Break]

          [Pre-Chorus]
          "I listened to your problems, now listen to mine"
          I didn't want to anymore, oh-oh-oh

          [Chorus]
          And we will never be alone again
          'Cause it doesn't happen every day
          Kinda counted on you being a friend
          Can I give it up or give it away?
          Now I thought about what I wanna say
          But I never really know where to go
          So I chained myself to a friend
          'Cause I know it unlocks like a door
          And we will never be alone again
          'Cause it doesn't happen every day
          Kinda counted on you being a friend
          Can I give it up or give it away?
          Now I thought about what I wanna say
          But I never really know where to go
          So I chained myself to a friend
          'Cause I know it unlocks like a–

          [Bridge]
          I don't understand, don't get upset
          I'm not with you
          We're swimming around, it's all I do
          When I'm with you

          [Chorus]
          And we will never be alone again
          'Cause it doesn't happen every day
          Kinda counted on you being a friend
          Can I give it up or give it away?
          Now I thought about what I wanna say
          But I never really know where to go
          So I chained myself to a friend
          'Cause I know it unlocks like a door
          And we will never be alone again
          'Cause it doesn't happen every day
          Kinda counted on you being a friend
          Can I give it up or give it away?
          Now I thought about what I wanna say
          But I never really know where to go
          So I chained myself to a friend
          'Cause I know it unlocks like a door

          [Produced by Daft Punk, Julian Casablancas, John "JR" Robinson, & Nathan East]`,
        title: 'Instant Crush',
        band: 'Daft Punk',
        featuring: 'Julian Casablancas',
        albumTitle: 'Random Access Memories',
        albumCover: '/images/seedPhotos/Instant_Crush.jpg',
        seedGenerated: true,
      },






    ]
    return queryInterface.bulkInsert('Tracks', defaultTracks, {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op
    return queryInterface.bulkDelete('Tracks', {
      seedGenerated: true
    }, {});
  }
};
