// stores all Trivia objects
let trivia = [];

// contains all Trivia information
class Trivia {
  constructor(contents, source, date) {
    this.contents = contents;
    this.source = source;
    this.date = date;
  }
}

// add a new piece of trivia
const addTrivia = (content, source, date) => {
  const newTrivia = new Trivia(content, source, date);
  trivia.push(newTrivia);
};

// remove a piece of trivia with a given source from the array
const removeTrivia = (source) => {
  for (let i = 0; i < trivia.length; i++) {
    if (trivia[i].source === source && trivia.length === 1) {
      trivia = [];
      return;
    }
    if (trivia[i].source === source) {
      trivia.slice(i, 1);
      return;
    }
  }
};

// returns the amount of trivia available
const getTriviaAmount = () => trivia.length;

// returns an array with a random piece of trivia
const getRandomTrivia = () => {
  const randTriviaNum = Math.floor(Math.random() * trivia.length);
  return [trivia[randTriviaNum]];
};

// returns an array of trivia with the given amount, with the given offset
const getTrivia = (amtTrivia, offset = 0) => {
  // make sure we don't try to give more trivia than we have
  if (amtTrivia > trivia.length) {
    return trivia;
  }
  let offsetToUse = offset;
  if (amtTrivia + offset > trivia.length) {
    offsetToUse = trivia.length - amtTrivia;
  }
  return trivia.slice(0 + offsetToUse, amtTrivia + offsetToUse);
};

module.exports = {
  addTrivia,
  removeTrivia,
  getRandomTrivia,
  getTrivia,
  getTriviaAmount,
};

// add all compiled trivia to the array
addTrivia('Slivers were first created by Mike Elliot in a set he made prior to working for Wizards called Astral Ways.'
  + ' The design of Slivers was inspired by the card Plague Rat from Alpha.',
'https://markrosewater.tumblr.com/post/188191108413/birthday-trivia-time-i-was-hoping-for-some-never#notes',
'10/7/2019');
addTrivia('Fusion Elemental, an 8/8 for WUBRG from Conflux, was called Five Scoops of Vanilla in playtest.',
  'https://markrosewater.tumblr.com/post/188106241578/todays-my-birthday-if-i-could-id-like-to#notes',
  '10/3/2019');
addTrivia('Double-faced cards are the deciduous mechanic with the most design space.',
  'https://markrosewater.tumblr.com/post/188030862098/what-deciduous-thing-has-the-most-and-least-design#notes',
  '9/29/2019');
addTrivia('Cycling is the non-evergreen mechanic with the most design space.',
  'https://markrosewater.tumblr.com/post/188026822623/what-named-non-evergreen-mechanic-has-the-most#notes',
  '9/29/2019');
addTrivia('The pile/choose mechanic used in cards such as Fact or Fiction is referred to as "divy" by R&D.',
  'https://markrosewater.tumblr.com/post/188015862478/why-so-little-use-of-the-pilechoose-mechanic-like#notes',
  '9/29/2019');
addTrivia('One reason reach is a keyword is that it makes it easier to write reminder text for flying.',
  'https://markrosewater.tumblr.com/post/187993334298/we-dont-do-reach-a-lot-it-does-seem-like#notes',
  '9/27/2019');
addTrivia('The fight mechanic was created to give green creature removal that is reliant on its creatures.',
  'https://markrosewater.tumblr.com/post/187993301803/if-i-remember-correctly-the-fight-mechanic-was#notes',
  '9/27/2019');
addTrivia('Ravnica, Innistrad, Tempest, Throne of Eldraine, Khans of Tarkir, Unstable, and War of the Spark'
  + ' are considered by Mark Rosewater to be the top tier of sets.',
'https://markrosewater.tumblr.com/post/187993164168/you-said-war-of-the-spark-is-in-your-top-tier-of#notes',
'9/27/2019');
addTrivia('Originally, the de-cursing of Garruk took place in Dominaria instead of Eldraine and involved Liliana.'
  + 'The subplot was lost when sets with codenames Soup and Salad got condensed down to one set.',
'https://markrosewater.tumblr.com/post/187981844288/was-there-any-talk-about-having-the-chained-veil#notes',
'9/27/2019');
addTrivia('It is possible within the rules for two double-faced cards to have different fronts but the same back.',
  'https://markrosewater.tumblr.com/post/187981798263/mark-im-a-bit-confused-i-asked-if-two-dfc-cards#notes',
  '9/27/2019');
addTrivia("If cycles are common or uncommon, they are usually designed with limited in mind. If they're"
  + " rare or mythic rare, they're not.",
'https://markrosewater.tumblr.com/post/187921625213/mark-a-friend-told-me-once-that-whenever-we-see-a#notes',
'9/24/2019');
addTrivia("Multicolored cards don't usually get to use effects that are tertiary for its colors.",
  'https://markrosewater.tumblr.com/post/187916187298/white-seems-to-get-full-reanimation-just-not-as#notes',
  '9/24/2019');
addTrivia('The Hideaway mechanic used in Lorwyn was originally a much bigger mechanic known as Treasure which '
  + 'showed up at all rarities including common.',
'https://markrosewater.tumblr.com/post/187887036723/hi-mark-its-my-birthday-today-i-was-wondering#notes',
'9/22/2019');
addTrivia('In Throne of Eldraine, the earliest version of a top-down Excalibur made whatever creature it was equipped'
  + ' to a noble.',
'https://markrosewater.tumblr.com/post/187883888023/hey-mark-its-my-birthday-again-i-dont-have-any#notes',
'9/22/2019');
addTrivia('A green knight card existed in Throne of Eldraine vision design, but it was determined that most people '
  + "wouldn't get the reference.",
'https://markrosewater.tumblr.com/post/187883103953/forget-about-black-knight-and-white-knight-if#notes',
'9/22/2019');
addTrivia('The Enchantress creature type used to exist, but was turned into Druid during the Grand Creature Update.',
  'https://markrosewater.tumblr.com/post/187881514568/since-we-have-artificers-could-we-also-get-the#notes',
  '9/22/2019');
addTrivia('The card Blind Seer from Invasion was Urza in disguise.',
  'https://markrosewater.tumblr.com/post/187873200213/hey-mark-its-my-girlfriends-birthday-she-loves#notes',
  '9/22/2019');
addTrivia('The card Chub Toad was in inside joke among Wizards of the Coast. It was an anagram of "bad touch", '
  + 'a Wizards saying from years ago.',
'https://markrosewater.tumblr.com/post/187865638348/do-any-wotc-inside-jokes-ever-make-it-onto-cards#notes',
'9/21/2019');
addTrivia('According to Mark Rosewater, the key to good design is to make things that someone will love, not just '
  + 'making things that no one will hate.',
'https://markrosewater.tumblr.com/post/187838970523/i-have-longtime-wished-that-magic-art-would-take#notes',
'9/20/2019');
addTrivia('When grouping effects in trading card games (such as colors in MTG), an odd number of groupings tend '
  + 'to play better, create more flow between the groupings, and prevent the game from dividing in half.',
'https://markrosewater.tumblr.com/post/187693023308/to-follow-up-that-parallel-universes-question-why#notes',
'9/13/2019');
addTrivia('Talking animals were left out of Eldraine because they were considered too silly.',
  'https://markrosewater.tumblr.com/post/187682085033/what-fairy-tales-did-you-leave-out-of-eldraine#notes',
  '9/13/2019');
addTrivia('One mechanic that was considered for Throne of Eldraine was quests, which were enchantments that gave'
  + ' you three tasks. You marked them with counters as you finished each one. Once all of them were completed, you could'
  + ' sacrifice the card for a big effect.',
'https://markrosewater.tumblr.com/post/187664672833/can-you-please-talk-about-what-quests-mechanic#notes',
'9/12/2019');
addTrivia('Liliana Vess is the oldest of the original five Lorwyn planeswalkers.',
  'https://markrosewater.tumblr.com/post/187513924148/hi-can-i-please-get-some-birthday-trivia-about#notes',
  '9/5/2019');
addTrivia('If the Ravnica Guilds were redesigned, Azorius and Selesnya would have different names so that players'
  + ' could remember them better.',
'https://markrosewater.tumblr.com/post/187441205433/hi-mark-its-my-birthday-could-i-please-get#notes',
'9/2/2019');
addTrivia('A set should have ten primary draft archetypes with another five to ten that are secondary.',
  'https://markrosewater.tumblr.com/post/187428928173/how-many-draft-archetypes-does-a-set-generally#notes',
  '9/1/2019');
addTrivia('Each shard (of Alara) had a design team of three people.',
  'https://markrosewater.tumblr.com/post/187420821573/so-last-year-for-this-day-you-informed-me-of-the#notes',
  '9/1/2019');
addTrivia('The set Unstable was basically completed for almost three years before it was released.',
  'https://markrosewater.tumblr.com/post/187397223643/did-it-ever-happend-that-a-set-was-finished-first#notes',
  '8/31/2019');
addTrivia('The playtest name for Vehicles was Vehicles.',
  'https://markrosewater.tumblr.com/post/187385479558/hey-mark-its-my-birthday-today-and-ive-been#notes',
  '8/30/2019');
addTrivia('Ken Nagle designed the mechanic Overload during the first Great Designer Search and then put it'
  + ' in a set he led the design for (Return to Ravnica).',
'https://markrosewater.tumblr.com/post/187385459463/do-you-have-any-tidbits-to-share-about-the-design#notes',
'8/30/2019');
addTrivia('When the rules team first came up with morph (while solving the rules for Illusionary Mask and Camouflage) '
  + ' their idea was a 1/1 for 2.',
'https://markrosewater.tumblr.com/post/187382903873/hello-mark-i-hope-youre-having-a-nice-day-i#notes',
'8/30/2019');
addTrivia('A "Wall of Text" wall creature was in Unstable for most of design.',
  'https://markrosewater.tumblr.com/post/187264432878/may-i-request-a-wall-of-text-wall-creature-card#notes',
  '8/25/2019');
addTrivia('In early Magic design, Unicorns were consciously designed to be on the weak side because it '
  + 'happened a few times by accident and became a running joke. This is not done purposefully anymore.',
'https://markrosewater.tumblr.com/post/187255866233/its-my-birthday-id-like-trivia-on-a-little#notes',
'8/25/2019');
addTrivia("More Cipher and Sliver cards are difficult to design because there's not enough design space.",
  'https://markrosewater.tumblr.com/post/187255790563/on-the-other-hand-are-there-any-mechanics-that#notes',
  '8/25/2019');
addTrivia('Black is the color that most encourages you to play more of itself.',
  'https://markrosewater.tumblr.com/post/187205046868/contrary-to-green-working-well-with-other-colors#notes',
  '8/23/2019');
addTrivia('Green is the color that gets along best with the other colors.',
  'https://markrosewater.tumblr.com/post/187200730953/green-being-what-it-is-would-it-be-the-color-that#notes',
  '8/22/2019');
addTrivia('The original populate mechanic copied one of each different token type, but it was too strong'
  + ' in playtesting, so it was changed to just one.',
'https://markrosewater.tumblr.com/post/187190602353/today-is-my-30th-birthday-i-am-curious-if-you-had#notes',
'8/22/2019');
