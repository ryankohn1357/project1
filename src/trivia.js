const trivia = { General: [], Design: [], Story: [] };

class Trivia {
  constructor(contents, source, date) {
    this.contents = contents;
    this.source = source;
    this.date = date;
  }
}

const addTrivia = (content, source, date, tag = 'Unknown') => {
  const newTrivia = new Trivia(content, source, date);
  if (tag === 'Unknown' || !trivia[tag]) {
    trivia.General.push(newTrivia);
  } else {
    trivia[tag].push(newTrivia);
  }
};

const removeTrivia = (source) => {
  const tags = Object.keys(trivia);
  for (let i = 0; i < tags.length; i++) {
    const tag = tags[i];
    const category = trivia[tag];
    for (let j = 0; j < category.length; j++) {
      if (category[j].source === source) {
        delete category[j];
        return;
      }
    }
  }
};

const getRandomTrivia = (tag = 'Random') => {
  let tagToUse = tag;
  if (tag === 'Random' || !trivia[tag]) {
    const tags = Object.keys(trivia);
    const randTagNum = Math.floor(Math.random() * tags.length);
    tagToUse = tags[randTagNum];
  }
  const taggedTrivia = trivia[tagToUse];
  const randTriviaNum = Math.floor(Math.random() * taggedTrivia.length);
  return [taggedTrivia[randTriviaNum]];
};

const getTriviaByTag = (tag, amtTrivia, offset = 0) => {
  let tagToUse = tag;
  if (!trivia[tag]) {
    tagToUse = 'General';
  }
  const taggedTrivia = trivia[tagToUse];
  if (amtTrivia > taggedTrivia.length) {
    return taggedTrivia;
  }
  let offsetToUse = offset;
  if (amtTrivia + offset > taggedTrivia.length) {
    offsetToUse = taggedTrivia.length - amtTrivia;
  }
  return taggedTrivia.slice(0 + offsetToUse, amtTrivia + offsetToUse);
};

module.exports = {
  addTrivia,
  removeTrivia,
  getRandomTrivia,
  getTriviaByTag,
};

addTrivia('Fusion Elemental, an 8/8 for WUBRG from Conflux, was called Five Scoops of Vanilla in playtest.',
  'https://markrosewater.tumblr.com/post/188106241578/todays-my-birthday-if-i-could-id-like-to#notes',
  '10/3/2019', 'General');
addTrivia('Double-faced cards are the deciduous mechanic with the most design space.',
  'https://markrosewater.tumblr.com/post/188030862098/what-deciduous-thing-has-the-most-and-least-design#notes',
  '9/29/2019', 'Design');
addTrivia('Cycling is the non-evergreen mechanic with the most design space.',
  'https://markrosewater.tumblr.com/post/188026822623/what-named-non-evergreen-mechanic-has-the-most#notes',
  '9/29/2019', 'Design');
addTrivia('The pile/choose mechanic used in cards such as Fact or Fiction is referred to as "divy" by R&D.',
  'https://markrosewater.tumblr.com/post/188015862478/why-so-little-use-of-the-pilechoose-mechanic-like#notes',
  '9/29/2019', 'General');
addTrivia('One reason reach is a keyword is that it makes it easier to write reminder text for flying.',
  'https://markrosewater.tumblr.com/post/187993334298/we-dont-do-reach-a-lot-it-does-seem-like#notes',
  '9/27/2019', 'General');
addTrivia('The fight mechanic was created to give green creature removal that is reliant on its creatures.',
  'https://markrosewater.tumblr.com/post/187993301803/if-i-remember-correctly-the-fight-mechanic-was#notes',
  '9/27/2019', 'Design');
addTrivia('Ravnica, Innistrad, Tempest, Throne of Eldraine, Khans of Tarkir, Unstable, and War of the Spark'
  + ' are considered by Mark Rosewater to be the top tier of sets.',
'https://markrosewater.tumblr.com/post/187993164168/you-said-war-of-the-spark-is-in-your-top-tier-of#notes',
'9/27/2019', 'General');
addTrivia('Originally, the de-cursing of Garruk took place in Dominaria instead of Eldraine and involved Liliana.'
  + 'The subplot was lost when sets with codenames Soup and Salad got condensed down to one set.',
'https://markrosewater.tumblr.com/post/187981844288/was-there-any-talk-about-having-the-chained-veil#notes',
'9/27/2019', 'Story');
addTrivia('It is possible within the rules for two double-faced cards to have different fronts but the same back.',
  'https://markrosewater.tumblr.com/post/187981798263/mark-im-a-bit-confused-i-asked-if-two-dfc-cards#notes',
  '9/27/2019', 'Design');
addTrivia("If cycles are common or uncommon, they are usually designed with limited in mind. If they're"
  + " rare or mythic rare, they're not.",
'https://markrosewater.tumblr.com/post/187921625213/mark-a-friend-told-me-once-that-whenever-we-see-a#notes',
'9/24/2019', 'Design');
