import { Task } from "@/components/TaskToEdit";

export const classNamesType = {
    "normal": "",
    "important": "underline font-semibold",
    "spiritual": "bg-secondary rounded-md p-1 text-blue-500",
}

export const classNamesState = {
    "done": "text-green-700 dark:text-green-300",
    "no done": "text-red-700 dark:text-red-300",
    "occupied": "text-blue-700 dark:text-blue-300",
}

export const stateEmoji = {
    "done": "✅",
    "no done": "❌",
    "occupied": "☑️"
}

export const doneInWhichWay = {
    "done": "✅Well done, to God be the glory 🙌",
    "no done": "❌Bad done, stop please, fear the Lord 💔",
    "occupied": "☑️Fairly done, to God be the glory 🙌",
}

/* export const DEFAULT_TASKS: Task[] = [{
    "name": "Wake up early",
    "type": "normal",
    "state": "no done",
    "time": "6:30 am"
},
{
    "name": "Battle Prayer ⚔🛡 and thanksgiving 🙏(kneeling down)",
    "type": "spiritual",
    "state": "no done",
    "time": "6:30 am"
},
{
    "name": "Go to the bathroom for grooming and brush teeth",
    "type": "normal",
    "state": "no done",
    "time": "6:40 am"
},
{
    "name": "Organize bed",
    "type": "normal",
    "state": "no done",
    "time": "6:40 am"
},
{
    "name": "Todays Four points to overcome and self-directed behavioral change",
    "type": "important",
    "state": "no done",
    "time": "6:50 am"
},
// {
//     "name": "Say a phrase: To hate sin and lust and To love God and his holiness",
//     "type": "normal",
//     "state": "no done",
//     "time": "6:20 am"
// },
// {
//     "name": "Battle Prayer ⚔🛡 and thanksgiving 🙏(kneeling down)",
//     "type": "spiritual",
//     "state": "no done",
//     "time": "7:00 am"
// },
// {
//     "name": "Bible verse📖✝: read, memorize and record audio",
//     "type": "spiritual",
//     "state": "no done",
//     "time": "7:00 am"
// },
// {
//     "name": "5x: move knee cap, hyperextended quad push, heel slides",
//     "type": "normal",
//     "state": "no done",
//     "time": "7:05 am"
// },

{
    "name": "📖✝Read Bible (10+ chapters or an entire book)",
    "type": "spiritual",
    "state": "no done",
    "time": "6:50 am"
},
{
    // "name": "🦵 Knee improvement Routine + Measure knee swelling",
    "name": "Measure knee swelling",
    "type": "important",
    "state": "no done",
    "time": "7:20 am"
},
{
    "name": "Exercises for the knee",
    "type": "important",
    "state": "no done",
    "time": "7:20 am"
},


// {
//     "name": "Data structures: read and record audio",
//     "type": "normal",
//     "state": "no done",
//     "time": "8:40 am"
// },





// {
//     "name": "Say what you did recently: was it sinful or righteous before God?",
//     "type": "normal",
//     "state": "no done",
//     "time": "8:50 am"
// },
// {
//     "name": "Say a phrase: To hate sin and To love God",
//     "type": "normal",
//     "state": "no done",
//     "time": "8:50 am"
// },
{
    "name": "Battle Prayer ⚔🛡 and thanksgiving 🙏",
    "type": "spiritual",
    "state": "no done",
    "time": "8:50 am"
},
{
    "name": "Bible verse📖✝: read, memorize and record audio",
    "type": "spiritual",
    "state": "no done",
    "time": "8:50 am"
},
{
    "name": "10x or 30s: push-ups, L-sit, core (if not working)",
    "type": "normal",
    "state": "no done",
    "time": "8:50 am"
},
// {
//     "name": "5x: move knee cap, hyperextended quad push , heel slides",
//     "type": "normal",
//     "state": "no done",
//     "time": "8:50 am"
// },
{
    "name": "🦵 Knee improvement Routine",
    "type": "important",
    "state": "no done",
    "time": "8:50 am"
},

{
    "name": "Take vitamin D, omega 3, and vitamin C",
    "type": "normal",
    "state": "no done",
    "time": "9:00 am"
},
{
    "name": "Software development / code projects",
    "type": "important",
    "state": "no done",
    "time": "9:10 am"
},
{
    "name": "🏀Spin basketball / Practice dribble and passes",
    "type": "normal",
    "state": "no done",
    "time": "9:50 am"
},

// {
//     "name": "Neck exercises",
//     "type": "normal",
//     "state": "no done",
//     "time": "10:10 am"
// },
{
    "name": "Practice with Brilliant App",
    "type": "normal",
    "state": "no done",
    "time": "10:00 am"
},
{
    "name": "Practice one Math exercise",
    "type": "normal",
    "state": "no done",
    "time": "10:10 am"
},
{
    "name": "Practice one Music reading exercise",
    "type": "normal",
    "state": "no done",
    "time": "10:20 am"
},
// {
//     "name": "Rubik's cubes 5x5 / games",
//     "type": "normal",
//     "state": "no done",
//     "time": "10:40 am"
// },
{
    "name": "Rubik's cubes 5x5 / 4x4",
    "type": "normal",
    "state": "no done",
    "time": "10:30 am"
},
{
    "name": "Games for brain training",
    "type": "normal",
    "state": "no done",
    "time": "10:40 am"
},







// {
//     "name": "Say what you did recently: was it sinful or righteous before God?",
//     "type": "normal",
//     "state": "occupied",
//     "time": "10:50 am"
// },
// {
//     "name": "Say a phrase: To hate sin and To love God",
//     "type": "normal",
//     "state": "occupied",
//     "time": "10:50 am"
// },
{
    "name": "Battle Prayer ⚔🛡 and thanksgiving 🙏",
    "type": "spiritual",
    "state": "occupied",
    "time": "10:50 am"
},
{
    "name": "Bible verse📖✝: read, memorize and record audio",
    "type": "spiritual",
    "state": "occupied",
    "time": "10:50 am"
},
{
    "name": "10x or 30s: push-ups, L-sit, core (if not working)",
    "type": "normal",
    "state": "occupied",
    "time": "10:50 am"
},
// {
//     "name": "5x: move knee cap, hyperextended quad push, heel slides",
//     "type": "normal",
//     "state": "occupied",
//     "time": "10:50 am"
// },
{
    "name": "🦵 Knee improvement Routine",
    "type": "important",
    "state": "occupied",
    "time": "10:50 am"
},

// {
//     "name": "Data structures: read and record audio",
//     "type": "normal",
//     "state": "occupied",
//     "time": "11:00 am"
// },
{
    "name": "Software development / code projects",
    "type": "important",
    "state": "occupied",
    "time": "11:20 am"
},
{
    "name": "Upload youtube short/ instagram reel to Palabra Abierta",
    "type": "normal",
    "state": "occupied",
    "time": "11:50 am"
},
{
    "name": "Meditate in what you are doing with the Bible?",
    "type": "normal",
    "state": "occupied",
    "time": "11:50 am"
},
{
    "name": "Meditate in what you are doing with the Bible?",
    "type": "normal",
    "state": "occupied",
    "time": "11:50 am"
},
{
    "name": "Meditate in what you are doing with the Bible?",
    "type": "normal",
    "state": "occupied",
    "time": "11:50 am"
},








// {
//     "name": "Say what you did recently: was it sinful or righteous before God?",
//     "type": "normal",
//     "state": "occupied",
//     "time": "12:00 pm"
// },
// {
//     "name": "Say a phrase: To hate sin and To love God",
//     "type": "normal",
//     "state": "occupied",
//     "time": "12:00 pm"
// },
{
    "name": "Battle Prayer ⚔🛡 and thanksgiving 🙏",
    "type": "spiritual",
    "state": "occupied",
    "time": "12:00 pm"
},
{
    "name": "Bible verse📖✝: read, memorize and record audio",
    "type": "spiritual",
    "state": "occupied",
    "time": "12:00 pm"
},
{
    "name": "10x or 30s: push-ups, L-sit, core (if not working)",
    "type": "normal",
    "state": "occupied",
    "time": "12:00 pm"
},
// {
//     "name": "5x: move knee cap, hyperextended quad push, heel slides",
//     "type": "normal",
//     "state": "occupied",
//     "time": "12:00 pm"
// },

{
    "name": "🦵 Knee improvement Routine",
    "type": "important",
    "state": "occupied",
    "time": "12:00 pm"
},

{
    "name": "Record yourself imitating a manly voice",
    "type": "normal",
    "state": "occupied",
    "time": "12:10 pm"
},
{
    "name": "🏀Spin basketball / Practice dribble and passes",
    "type": "normal",
    "state": "occupied",
    "time": "12:20 pm"
},
// {
//     "name": "Rubik's cubes 4x4 / games",
//     "type": "normal",
//     "state": "occupied",
//     "time": "12:30 pm"
// },
// {
//     "name": "Practice one Math exercise",
//     "type": "normal",
//     "state": "occupied",
//     "time": "12:40 pm"
// },
// {
//     "name": "Practice one Music reading exercise",
//     "type": "normal",
//     "state": "occupied",
//     "time": "12:50 pm"
// },
// {
//     "name": "Do a brilliant lesson",
//     "type": "normal",
//     "state": "occupied",
//     "time": "1:00 pm"
// },
{
    "name": "Work on a side hustle",
    "type": "important",
    "state": "occupied",
    "time": "12:30 pm"
},
{
    "name": "Practice Hard riddle TedEd/MindYourDecisions",
    "type": "normal",
    "state": "occupied",
    "time": "12:50 pm"
},
{
    "name": "Meditate in what you are doing with the Bible?",
    "type": "normal",
    "state": "occupied",
    "time": "12:50 pm"
},
{
    "name": "Meditate in what you are doing with the Bible?",
    "type": "normal",
    "state": "occupied",
    "time": "12:50 pm"
},
{
    "name": "Meditate in what you are doing with the Bible?",
    "type": "normal",
    "state": "occupied",
    "time": "12:50 pm"
},
{
    "name": "Meditate in what you are doing with the Bible?",
    "type": "normal",
    "state": "occupied",
    "time": "12:50 pm"
},








// {
//     "name": "Say what you did recently: was it sinful or righteous before God?",
//     "type": "normal",
//     "state": "occupied",
//     "time": "1:10 pm"
// },
// {
//     "name": "Say a phrase: To hate sin and To love God",
//     "type": "normal",
//     "state": "occupied",
//     "time": "1:10 pm"
// },
{
    "name": "Battle Prayer ⚔🛡 and thanksgiving 🙏",
    "type": "spiritual",
    "state": "occupied",
    "time": "1:10 pm"
},
{
    "name": "Bible verse📖✝: read, memorize and record audio",
    "type": "spiritual",
    "state": "occupied",
    "time": "1:10 pm"
},
{
    "name": "10x or 30s: push-ups, L-sit, core (if not working)",
    "type": "normal",
    "state": "occupied",
    "time": "1:10 pm"
},
// {
//     "name": "5x: move knee cap, hyperextended quad push, heel slides",
//     "type": "normal",
//     "state": "occupied",
//     "time": "1:10 pm"
// },
{
    "name": "🦵 Knee improvement Routine",
    "type": "important",
    "state": "occupied",
    "time": "1:10 pm"
},

{
    "name": "Neck exercises",
    "type": "normal",
    "state": "occupied",
    "time": "1:20 pm"
},
// {
//     "name": "Play marvel snap",
//     "type": "normal",
//     "state": "occupied",
//     "time": "2:00 pm"
// },
// {
//     "name": "Populate mongodb databases",
//     "type": "normal",
//     "state": "occupied",
//     "time": "2:30 pm"
// },
{
    "name": "Software development / code projects (long session)",
    "type": "important",
    "state": "occupied",
    "time": "1:50 pm"
},

{
    "name": "Meditate in what you are doing with the Bible?",
    "type": "normal",
    "state": "occupied",
    "time": "1:50 pm"
},
{
    "name": "Meditate in what you are doing with the Bible?",
    "type": "normal",
    "state": "occupied",
    "time": "1:50 pm"
},
{
    "name": "Meditate in what you are doing with the Bible?",
    "type": "normal",
    "state": "occupied",
    "time": "1:50 pm"
},
{
    "name": "Meditate in what you are doing with the Bible?",
    "type": "normal",
    "state": "occupied",
    "time": "1:50 pm"
},






// {
//     "name": "Say what you did recently: was it sinful or righteous before God?",
//     "type": "normal",
//     "state": "occupied",
//     "time": "3:00 pm"
// },
// {
//     "name": "Say a phrase: To hate sin and To love God",
//     "type": "normal",
//     "state": "occupied",
//     "time": "3:00 pm"
// },
{
    "name": "Battle Prayer ⚔🛡 and thanksgiving 🙏",
    "type": "spiritual",
    "state": "occupied",
    "time": "3:00 pm"
},
{
    "name": "Bible verse📖✝: read, memorize and record audio",
    "type": "spiritual",
    "state": "occupied",
    "time": "3:00 pm"
},
{
    "name": "10x or 30s: push-ups, L-sit, core (if not working)",
    "type": "normal",
    "state": "occupied",
    "time": "3:00 pm"
},
// {
//     "name": "5x: move knee cap, hyperextended quad push, heel slides",
//     "type": "normal",
//     "state": "occupied",
//     "time": "3:00 pm"
// },
{
    "name": "🦵 Knee improvement Routine",
    "type": "important",
    "state": "occupied",
    "time": "3:00 pm"
},

// {
//     "name": "Workout to sweat (if injured job or knee exercise counts)",
//     "type": "normal",
//     "state": "occupied",
//     "time": "3:10 pm"
// },
{
    "name": "Record yourself imitating a manly voice",
    "type": "normal",
    "state": "occupied",
    "time": "3:20 pm"
},
{
    "name": "Share a Christian quote or a verse to social networks",
    "type": "normal",
    "state": "occupied",
    "time": "3:30 pm"
},
{
    // "name": "Data structures: read and record audio",
    "name": "Learn and study Data structures▶💻⚙📊💡💾",
    "type": "important",
    "state": "occupied",
    "time": "3:50 pm"
},

{
    "name": "Meditate in what you are doing with the Bible?",
    "type": "normal",
    "state": "occupied",
    "time": "3:50 pm"
},
{
    "name": "Meditate in what you are doing with the Bible?",
    "type": "normal",
    "state": "occupied",
    "time": "3:50 pm"
},
{
    "name": "Meditate in what you are doing with the Bible?",
    "type": "normal",
    "state": "occupied",
    "time": "3:50 pm"
},
{
    "name": "Meditate in what you are doing with the Bible?",
    "type": "normal",
    "state": "occupied",
    "time": "3:50 pm"
},
{
    "name": "Meditate in what you are doing with the Bible?",
    "type": "normal",
    "state": "occupied",
    "time": "3:50 pm"
},
{
    "name": "Meditate in what you are doing with the Bible?",
    "type": "normal",
    "state": "occupied",
    "time": "3:50 pm"
},







// {
//     "name": "Say what you did recently: was it sinful or righteous before God?",
//     "type": "normal",
//     "state": "occupied",
//     "time": "4:10 pm"
// },
// {
//     "name": "Say a phrase: To hate sin and To love God",
//     "type": "normal",
//     "state": "occupied",
//     "time": "4:10 pm"
// },
{
    "name": "Battle Prayer ⚔🛡 and thanksgiving 🙏",
    "type": "spiritual",
    "state": "occupied",
    "time": "4:10 pm"
},
{
    "name": "Bible verse📖✝: read, memorize and record audio",
    "type": "spiritual",
    "state": "occupied",
    "time": "4:10 pm"
},
{
    "name": "10x or 30s: push-ups, L-sit, core (if not working)",
    "type": "normal",
    "state": "occupied",
    "time": "4:10 pm"
},
// {
//     "name": "5x: move knee cap, hyperextended quad push, heel slides",
//     "type": "normal",
//     "state": "occupied",
//     "time": "4:10 pm"
// },
{
    "name": "🦵 Knee improvement Routine",
    "type": "important",
    "state": "occupied",
    "time": "4:10 pm"
},
{
    "name": "Read from be a man (demark last and mark current)",
    "type": "normal",
    "state": "occupied",
    "time": "4:20 pm"
},
// {
//     "name": "Learn or practice one card trick 🃏",
//     "type": "normal",
//     "state": "occupied",
//     "time": "4:30 pm"
// },
// {
//     "name": "Do something pending from the To Do list below",
//     "type": "normal",
//     "state": "occupied",
//     "time": "4:30 pm"
// },
{
    "name": "Learn a new english word",
    "type": "normal",
    "state": "occupied",
    "time": "4:30 pm"
},
{
    "name": "Back exercises",
    "type": "normal",
    "state": "occupied",
    "time": "4:40 pm"
},
{
    "name": "Meditate in what you are doing with the Bible?",
    "type": "normal",
    "state": "occupied",
    "time": "4:55 pm"
},
{
    "name": "Meditate in what you are doing with the Bible?",
    "type": "normal",
    "state": "occupied",
    "time": "4:55 pm"
},
{
    "name": "Meditate in what you are doing with the Bible?",
    "type": "normal",
    "state": "occupied",
    "time": "4:55 pm"
},








// {
//     "name": "Say what you did recently: was it sinful or righteous before God?",
//     "type": "normal",
//     "state": "occupied",
//     "time": "5:00 pm"
// },
// {
//     "name": "Say a phrase: To hate sin and To love God",
//     "type": "normal",
//     "state": "occupied",
//     "time": "5:00 pm"
// },
{
    "name": "Battle Prayer ⚔🛡 and thanksgiving 🙏",
    "type": "spiritual",
    "state": "occupied",
    "time": "5:00 pm"
},
{
    "name": "Bible verse📖✝: read, memorize and record audio",
    "type": "spiritual",
    "state": "occupied",
    "time": "5:00 pm"
},
{
    "name": "10x or 30s: push-ups, L-sit, core (if not working)",
    "type": "normal",
    "state": "occupied",
    "time": "5:00 pm"
},
// {
//     "name": "5x: move knee cap, hyperextended quad push, heel slides",
//     "type": "normal",
//     "state": "occupied",
//     "time": "5:00 pm"
// },
{
    "name": "🦵 Knee improvement Routine",
    "type": "important",
    "state": "occupied",
    "time": "5:00 pm"
},
{
    "name": "Learn or practice one card trick 🃏",
    "type": "normal",
    "state": "occupied",
    "time": "5:10 pm"
},
{
    "name": "Learn a new english word",
    "type": "normal",
    "state": "occupied",
    "time": "5:20 pm"
},

{
    "name": "Learn new Software development with tutorials/courses",
    "type": "important",
    "state": "occupied",
    "time": "5:30 pm"
},
{
    "name": "🏀Spin basketball / Practice dribble and passes",
    "type": "normal",
    "state": "occupied",
    "time": "7:20 pm"
},
{
    "name": "Meditate in what you are doing with the Bible?",
    "type": "normal",
    "state": "occupied",
    "time": "7:20 pm"
},
{
    "name": "Meditate in what you are doing with the Bible?",
    "type": "normal",
    "state": "occupied",
    "time": "7:20 pm"
},
{
    "name": "Meditate in what you are doing with the Bible?",
    "type": "normal",
    "state": "occupied",
    "time": "7:20 pm"
},









// {
//     "name": "Say what you did recently: was it sinful or righteous before God?",
//     "type": "normal",
//     "state": "occupied",
//     "time": "6:40 pm"
// },
// {
//     "name": "Say a phrase: To hate sin and To love God",
//     "type": "normal",
//     "state": "occupied",
//     "time": "6:40 pm"
// },
{
    "name": "Battle Prayer ⚔🛡 and thanksgiving 🙏",
    "type": "spiritual",
    "state": "no done",
    // "time": "6:40 pm"
    "time": "7:30 pm"
},
{
    "name": "Bible verse📖✝: read, memorize and record audio",
    "type": "spiritual",
    "state": "no done",
    // "time": "6:40 pm"
    "time": "7:30 pm"
},
{
    "name": "10x or 30s: push-ups, L-sit, core (if not working)",
    "type": "normal",
    "state": "no done",
    // "time": "6:40 pm"
    "time": "7:30 pm"
},
// {
//     "name": "5x: move knee cap, hyperextended quad push, heel slides",
//     "type": "normal",
//     "state": "no done",
//    // "time": "6:40 pm"
//     "time": "7:30 pm"
// },
{
    "name": "🦵 Knee improvement Routine",
    "type": "important",
    "state": "no done",
    // "time": "6:40 pm"
    "time": "7:30 pm"
},

// {
//     "name": "Solve problem from advent of code / leetcode / brilliant",
//     "type": "normal",
//     "state": "no done",
//     "time": "6:50 pm"
// },
{
    "name": "📖✝Bookmark or review the key verses from the bible chapters I read (NKJV)",
    "type": "spiritual",
    "state": "no done",
    "time": "7:40 pm"
},

{
    "name": "Family time",
    "type": "spiritual",
    "state": "no done",
    "time": "8:00 pm"
},

{
    "name": "Prayer time with family",
    "type": "spiritual",
    "state": "no done",
    "time": "8:00 pm"
},


// {
//     "name": "Get all mobile devices out of the bedroom",
//     "type": "normal",
//     "state": "no done",
//     "time": "8:00 pm"
// },








// {
//     "name": "Say what you did recently: was it sinful or righteous before God?",
//     "type": "normal",
//     "state": "no done",
//     "time": "8:30 pm"
// },
// {
//     "name": "Say a phrase: To hate sin and To love God",
//     "type": "normal",
//     "state": "no done",
//     "time": "8:30 pm"
// },
{
    "name": "Battle Prayer ⚔🛡 and thanksgiving 🙏",
    "type": "spiritual",
    "state": "no done",
    "time": "8:30 pm"
},
{
    "name": "Bible verse📖✝: read, memorize and record audio",
    "type": "spiritual",
    "state": "no done",
    "time": "8:30 pm"
},

// {
//     "name": "10x or 30s: push-ups, L-sit, core (if not working)",
//     "type": "normal",
//     "state": "no done",
//     "time": "8:30 pm"
// },
{
    "name": "Brush teeth",
    "type": "normal",
    "state": "no done",
    "time": "9:00 pm"
},
// {
//     "name": "Read 100 pure thoughts",
//     "type": "normal",
//     "state": "no done",
//     "time": "9:10 pm"
// },
{
    // "name": "Back exercises",
    "name": "Stretching exercises",
    "type": "normal",
    "state": "no done",
    "time": "8:50 pm"
},
// {
//     "name": "5x: move knee cap, hyperextended quad push, heel slides",
//     "type": "normal",
//     "state": "no done",
//     "time": "8:30 pm"
// },


{
    "name": "🦵 Knee improvement Routine",
    "type": "important",
    "state": "no done",
    "time": "9:00 pm"
},
{
    "name": "Measure knee swelling and elevate leg 30 min",
    "type": "important",
    "state": "no done",
    "time": "9:00 pm"
},
{
    "name": "Todays Four points to overcome and self-directed behavioral change",
    "type": "important",
    "state": "no done",
    "time": "9:30 pm"
},

// {
//     "name": "Cover in blanket and Listen to christian music",
//     "type": "normal",
//     "state": "no done",
//     "time": "9:20 pm"
// },
// {
//     "name": "Put the clock and turn off the TV",
//     "type": "important",
//     "state": "no done",
//     "time": "10:00 pm"
// },
// {
//     "name": "Battle Prayer ⚔🛡 and thanksgiving 🙏(Kneel down and speak aloud)",
//     "type": "spiritual",
//     "state": "no done",
//     "time": "10:00 pm"
// }
{
    "name": "Are you going to honor God, love your family and invest in your future tonight?",
    "type": "spiritual",
    "state": "no done",
    "time": "9:50 pm"
}
] */

export const DEFAULT_TASKS: Task[] = [
    {
        "name": "Wake up early",
        "type": "normal",
        "state": "no done",
        "time": "6:10 am",
        "id": 0
    },
    {
        "name": "Battle Prayer ⚔🛡 and thanksgiving 🙏(kneeling down)",
        "type": "spiritual",
        "state": "no done",
        "time": "6:10 am",
        "id": 1
    },
    {
        "name": "Go to the bathroom for grooming and brush teeth",
        "type": "normal",
        "state": "no done",
        "time": "6:20 am",
        "id": 2
    },
    {
        "name": "Organize bed",
        "type": "normal",
        "state": "no done",
        "time": "6:20 am",
        "id": 3
    },
    {
        "name": "Todays Four points to overcome and self-directed behavioral change",
        "type": "important",
        "state": "no done",
        "time": "6:30 am",
        "id": 4
    },
    {
        "name": "📖✝Read Bible (10+ chapters or an entire book)",
        "type": "spiritual",
        "state": "no done",
        "time": "6:40 am",
        "id": 5
    },
    {
        "name": "Measure knee swelling",
        "type": "important",
        "state": "no done",
        "time": "7:20 am",
        "id": 6
    },
    {
        "name": "Exercises for the knee",
        "type": "important",
        "state": "no done",
        "time": "7:20 am",
        "id": 7
    },
    {
        "name": "Battle Prayer ⚔🛡 and thanksgiving 🙏",
        "type": "spiritual",
        "state": "no done",
        "time": "8:50 am",
        "id": 8
    },
    {
        "name": "Bible verse📖✝: read, memorize and record audio",
        "type": "spiritual",
        "state": "no done",
        "time": "8:50 am",
        "id": 9
    },
    {
        "name": "10x or 30s: push-ups, L-sit, core (if not working)",
        "type": "normal",
        "state": "no done",
        "time": "8:50 am",
        "id": 10
    },
    {
        "name": "🦵 Knee improvement Routine",
        "type": "important",
        "state": "no done",
        "time": "8:50 am",
        "id": 11
    },
    {
        "name": "Take vitamin D, omega 3, and vitamin C",
        "type": "normal",
        "state": "no done",
        "time": "9:00 am",
        "id": 12
    },
    {
        "name": "Software development / code projects",
        "type": "important",
        "state": "no done",
        "time": "9:10 am",
        "id": 13
    },
    {
        "name": "🏀Spin basketball / Practice dribble and passes",
        "type": "normal",
        "state": "no done",
        "time": "9:50 am",
        "id": 14
    },
    {
        "name": "Practice with Brilliant App",
        "type": "normal",
        "state": "no done",
        "time": "10:00 am",
        "id": 15
    },
    {
        "name": "Practice one Math exercise",
        "type": "normal",
        "state": "no done",
        "time": "10:10 am",
        "id": 16
    },
    {
        "name": "Practice one Music reading exercise",
        "type": "normal",
        "state": "no done",
        "time": "10:20 am",
        "id": 17
    },
    {
        "name": "Rubik's cubes 5x5 / 4x4",
        "type": "normal",
        "state": "no done",
        "time": "10:30 am",
        "id": 18
    },
    {
        "name": "Games for brain training",
        "type": "normal",
        "state": "no done",
        "time": "10:40 am",
        "id": 19
    },
    {
        "name": "Battle Prayer ⚔🛡 and thanksgiving 🙏",
        "type": "spiritual",
        "state": "occupied",
        "time": "10:50 am",
        "id": 20
    },
    {
        "name": "Bible verse📖✝: read, memorize and record audio",
        "type": "spiritual",
        "state": "occupied",
        "time": "10:50 am",
        "id": 21
    },
    {
        "name": "10x or 30s: push-ups, L-sit, core (if not working)",
        "type": "normal",
        "state": "occupied",
        "time": "10:50 am",
        "id": 22
    },
    {
        "name": "🦵 Knee improvement Routine",
        "type": "important",
        "state": "occupied",
        "time": "10:50 am",
        "id": 23
    },
    {
        "name": "Software development / code projects",
        "type": "important",
        "state": "occupied",
        "time": "11:20 am",
        "id": 24
    },
    {
        "name": "Upload youtube short/ instagram reel to Palabra Abierta",
        "type": "normal",
        "state": "occupied",
        "time": "11:50 am",
        "id": 25
    },
    {
        "name": "Meditate in what you are doing with the Bible?",
        "type": "normal",
        "state": "occupied",
        "time": "11:50 am",
        "id": 26
    },
    {
        "name": "Meditate in what you are doing with the Bible?",
        "type": "normal",
        "state": "occupied",
        "time": "11:50 am",
        "id": 27
    },
    {
        "name": "Meditate in what you are doing with the Bible?",
        "type": "normal",
        "state": "occupied",
        "time": "11:50 am",
        "id": 28
    },
    {
        "name": "Battle Prayer ⚔🛡 and thanksgiving 🙏",
        "type": "spiritual",
        "state": "occupied",
        "time": "12:00 pm",
        "id": 29
    },
    {
        "name": "Bible verse📖✝: read, memorize and record audio",
        "type": "spiritual",
        "state": "occupied",
        "time": "12:00 pm",
        "id": 30
    },
    {
        "name": "10x or 30s: push-ups, L-sit, core (if not working)",
        "type": "normal",
        "state": "occupied",
        "time": "12:00 pm",
        "id": 31
    },
    {
        "name": "🦵 Knee improvement Routine",
        "type": "important",
        "state": "occupied",
        "time": "12:00 pm",
        "id": 32
    },
    {
        "name": "Record yourself imitating a manly voice",
        "type": "normal",
        "state": "occupied",
        "time": "12:10 pm",
        "id": 33
    },
    {
        "name": "🏀Spin basketball / Practice dribble and passes",
        "type": "normal",
        "state": "occupied",
        "time": "12:20 pm",
        "id": 34
    },
    {
        "name": "Work on a side hustle",
        "type": "important",
        "state": "occupied",
        "time": "12:30 pm",
        "id": 35
    },
    {
        "name": "Practice Hard riddle TedEd/MindYourDecisions",
        "type": "normal",
        "state": "occupied",
        "time": "12:50 pm",
        "id": 36
    },
    {
        "name": "Meditate in what you are doing with the Bible?",
        "type": "normal",
        "state": "occupied",
        "time": "12:50 pm",
        "id": 37
    },
    {
        "name": "Meditate in what you are doing with the Bible?",
        "type": "normal",
        "state": "occupied",
        "time": "12:50 pm",
        "id": 38
    },
    {
        "name": "Meditate in what you are doing with the Bible?",
        "type": "normal",
        "state": "occupied",
        "time": "12:50 pm",
        "id": 39
    },
    {
        "name": "Meditate in what you are doing with the Bible?",
        "type": "normal",
        "state": "occupied",
        "time": "12:50 pm",
        "id": 40
    },
    {
        "name": "Battle Prayer ⚔🛡 and thanksgiving 🙏",
        "type": "spiritual",
        "state": "occupied",
        "time": "1:10 pm",
        "id": 41
    },
    {
        "name": "Bible verse📖✝: read, memorize and record audio",
        "type": "spiritual",
        "state": "occupied",
        "time": "1:10 pm",
        "id": 42
    },
    {
        "name": "10x or 30s: push-ups, L-sit, core (if not working)",
        "type": "normal",
        "state": "occupied",
        "time": "1:10 pm",
        "id": 43
    },
    {
        "name": "🦵 Knee improvement Routine",
        "type": "important",
        "state": "occupied",
        "time": "1:10 pm",
        "id": 44
    },
    {
        "name": "Neck exercises",
        "type": "normal",
        "state": "occupied",
        "time": "1:20 pm",
        "id": 45
    },
    {
        "name": "Software development / code projects (long session)",
        "type": "important",
        "state": "occupied",
        "time": "1:50 pm",
        "id": 46
    },
    {
        "name": "Meditate in what you are doing with the Bible?",
        "type": "normal",
        "state": "occupied",
        "time": "1:50 pm",
        "id": 47
    },
    {
        "name": "Meditate in what you are doing with the Bible?",
        "type": "normal",
        "state": "occupied",
        "time": "1:50 pm",
        "id": 48
    },
    {
        "name": "Meditate in what you are doing with the Bible?",
        "type": "normal",
        "state": "occupied",
        "time": "1:50 pm",
        "id": 49
    },
    {
        "name": "Meditate in what you are doing with the Bible?",
        "type": "normal",
        "state": "occupied",
        "time": "1:50 pm",
        "id": 50
    },
    {
        "name": "Battle Prayer ⚔🛡 and thanksgiving 🙏",
        "type": "spiritual",
        "state": "occupied",
        "time": "3:00 pm",
        "id": 51
    },
    {
        "name": "Bible verse📖✝: read, memorize and record audio",
        "type": "spiritual",
        "state": "occupied",
        "time": "3:00 pm",
        "id": 52
    },
    {
        "name": "10x or 30s: push-ups, L-sit, core (if not working)",
        "type": "normal",
        "state": "occupied",
        "time": "3:00 pm",
        "id": 53
    },
    {
        "name": "🦵 Knee improvement Routine",
        "type": "important",
        "state": "occupied",
        "time": "3:00 pm",
        "id": 54
    },
    {
        "name": "Record yourself imitating a manly voice",
        "type": "normal",
        "state": "occupied",
        "time": "3:20 pm",
        "id": 55
    },
    {
        "name": "Share a Christian quote or a verse to social networks",
        "type": "normal",
        "state": "occupied",
        "time": "3:30 pm",
        "id": 56
    },
    {
        "name": "Learn and study Data structures▶💻⚙📊💡💾",
        "type": "important",
        "state": "occupied",
        "time": "3:50 pm",
        "id": 57
    },
    {
        "name": "Meditate in what you are doing with the Bible?",
        "type": "normal",
        "state": "occupied",
        "time": "3:50 pm",
        "id": 58
    },
    {
        "name": "Meditate in what you are doing with the Bible?",
        "type": "normal",
        "state": "occupied",
        "time": "3:50 pm",
        "id": 59
    },
    {
        "name": "Meditate in what you are doing with the Bible?",
        "type": "normal",
        "state": "occupied",
        "time": "3:50 pm",
        "id": 60
    },
    {
        "name": "Meditate in what you are doing with the Bible?",
        "type": "normal",
        "state": "occupied",
        "time": "3:50 pm",
        "id": 61
    },
    {
        "name": "Meditate in what you are doing with the Bible?",
        "type": "normal",
        "state": "occupied",
        "time": "3:50 pm",
        "id": 62
    },
    {
        "name": "Meditate in what you are doing with the Bible?",
        "type": "normal",
        "state": "occupied",
        "time": "3:50 pm",
        "id": 63
    },
    {
        "name": "Battle Prayer ⚔🛡 and thanksgiving 🙏",
        "type": "spiritual",
        "state": "occupied",
        "time": "4:10 pm",
        "id": 64
    },
    {
        "name": "Bible verse📖✝: read, memorize and record audio",
        "type": "spiritual",
        "state": "occupied",
        "time": "4:10 pm",
        "id": 65
    },
    {
        "name": "10x or 30s: push-ups, L-sit, core (if not working)",
        "type": "normal",
        "state": "occupied",
        "time": "4:10 pm",
        "id": 66
    },
    {
        "name": "🦵 Knee improvement Routine",
        "type": "important",
        "state": "occupied",
        "time": "4:10 pm",
        "id": 67
    },
    {
        "name": "Read from be a man (demark last and mark current)",
        "type": "normal",
        "state": "occupied",
        "time": "4:20 pm",
        "id": 68
    },
    {
        "name": "Learn a new english word",
        "type": "normal",
        "state": "occupied",
        "time": "4:30 pm",
        "id": 69
    },
    {
        "name": "Back exercises",
        "type": "normal",
        "state": "occupied",
        "time": "4:40 pm",
        "id": 70
    },
    {
        "name": "Meditate in what you are doing with the Bible?",
        "type": "normal",
        "state": "occupied",
        "time": "4:55 pm",
        "id": 71
    },
    {
        "name": "Meditate in what you are doing with the Bible?",
        "type": "normal",
        "state": "occupied",
        "time": "4:55 pm",
        "id": 72
    },
    {
        "name": "Meditate in what you are doing with the Bible?",
        "type": "normal",
        "state": "occupied",
        "time": "4:55 pm",
        "id": 73
    },
    {
        "name": "Battle Prayer ⚔🛡 and thanksgiving 🙏",
        "type": "spiritual",
        "state": "occupied",
        "time": "5:00 pm",
        "id": 74
    },
    {
        "name": "Bible verse📖✝: read, memorize and record audio",
        "type": "spiritual",
        "state": "occupied",
        "time": "5:00 pm",
        "id": 75
    },
    {
        "name": "10x or 30s: push-ups, L-sit, core (if not working)",
        "type": "normal",
        "state": "occupied",
        "time": "5:00 pm",
        "id": 76
    },
    {
        "name": "🦵 Knee improvement Routine",
        "type": "important",
        "state": "occupied",
        "time": "5:00 pm",
        "id": 77
    },
    {
        "name": "Learn or practice one card trick 🃏",
        "type": "normal",
        "state": "occupied",
        "time": "5:10 pm",
        "id": 78
    },
    {
        "name": "Learn a new english word",
        "type": "normal",
        "state": "occupied",
        "time": "5:20 pm",
        "id": 79
    },
    {
        "name": "Learn new Software development with tutorials/courses",
        "type": "important",
        "state": "occupied",
        "time": "5:30 pm",
        "id": 80
    },
    {
        "name": "🏀Spin basketball / Practice dribble and passes",
        "type": "normal",
        "state": "occupied",
        "time": "7:20 pm",
        "id": 81
    },
    {
        "name": "Meditate in what you are doing with the Bible?",
        "type": "normal",
        "state": "occupied",
        "time": "7:20 pm",
        "id": 82
    },
    {
        "name": "Meditate in what you are doing with the Bible?",
        "type": "normal",
        "state": "occupied",
        "time": "7:20 pm",
        "id": 83
    },
    {
        "name": "Meditate in what you are doing with the Bible?",
        "type": "normal",
        "state": "occupied",
        "time": "7:20 pm",
        "id": 84
    },
    {
        "name": "Battle Prayer ⚔🛡 and thanksgiving 🙏",
        "type": "spiritual",
        "state": "no done",
        "time": "7:30 pm",
        "id": 85
    },
    {
        "name": "Bible verse📖✝: read, memorize and record audio",
        "type": "spiritual",
        "state": "no done",
        "time": "7:30 pm",
        "id": 86
    },
    {
        "name": "10x or 30s: push-ups, L-sit, core (if not working)",
        "type": "normal",
        "state": "no done",
        "time": "7:30 pm",
        "id": 87
    },
    {
        "name": "🦵 Knee improvement Routine",
        "type": "important",
        "state": "no done",
        "time": "7:30 pm",
        "id": 88
    },
    {
        "name": "📖✝Bookmark or review the key verses from the bible chapters I read (NKJV)",
        "type": "spiritual",
        "state": "no done",
        "time": "7:40 pm",
        "id": 89
    },
    {
        "name": "Family time",
        "type": "spiritual",
        "state": "no done",
        "time": "8:00 pm",
        "id": 90
    },
    {
        "name": "Prayer time with family",
        "type": "spiritual",
        "state": "no done",
        "time": "8:00 pm",
        "id": 91
    },
    {
        "name": "Battle Prayer ⚔🛡 and thanksgiving 🙏",
        "type": "spiritual",
        "state": "no done",
        "time": "8:30 pm",
        "id": 92
    },
    {
        "name": "Bible verse📖✝: read, memorize and record audio",
        "type": "spiritual",
        "state": "no done",
        "time": "8:30 pm",
        "id": 93
    },
    {
        "name": "Brush teeth",
        "type": "normal",
        "state": "no done",
        "time": "9:00 pm",
        "id": 94
    },
    {
        "name": "Stretching exercises",
        "type": "normal",
        "state": "no done",
        "time": "8:50 pm",
        "id": 95
    },
    {
        "name": "🦵 Knee improvement Routine",
        "type": "important",
        "state": "no done",
        "time": "9:00 pm",
        "id": 96
    },
    {
        "name": "Measure knee swelling and elevate leg 30 min",
        "type": "important",
        "state": "no done",
        "time": "9:00 pm",
        "id": 97
    },
    {
        "name": "Todays Four points to overcome and self-directed behavioral change",
        "type": "important",
        "state": "no done",
        "time": "9:30 pm",
        "id": 98
    },
    {
        "name": "Are you going to honor God, love your family and invest in your future tonight?",
        "type": "spiritual",
        "state": "no done",
        "time": "9:50 pm",
        "id": 99
    }
]

export const TIMES = [
    "5:00 am",
    "6:00 am",
    "6:10 am",
    "6:20 am",
    "6:30 am",
    "6:40 am",
    "6:50 am",
    "7:00 am",
    "7:10 am",
    "7:20 am",
    "7:30 am",
    "7:40 am",
    "7:50 am",
    "8:00 am",
    "8:10 am",
    "8:20 am",
    "8:30 am",
    "8:40 am",
    "8:50 am",
    "9:00 am",
    "9:10 am",
    "9:20 am",
    "9:30 am",
    "9:40 am",
    "9:50 am",
    "10:00 am",
    "10:10 am",
    "10:20 am",
    "10:30 am",
    "10:35 am",
    "10:40 am",
    "10:50 am",
    "11:00 am",
    "11:10 am",
    "11:20 am",
    "11:30 am",
    "11:40 am",
    "11:50 am",
    "12:00 pm",
    "12:10 pm",
    "12:20 pm",
    "12:30 pm",
    "12:40 pm",
    "12:50 pm",
    "1:00 pm",
    "1:10 pm",
    "1:20 pm",
    "1:30 pm",
    "1:40 pm",
    "1:50 pm",
    "2:00 pm",
    "2:30 pm",
    "3:00 pm",
    "3:10 pm",
    "3:20 pm",
    "3:30 pm",
    "3:40 pm",
    "3:50 pm",
    "4:00 pm",
    "4:10 pm",
    "4:20 pm",
    "4:30 pm",
    "4:40 pm",
    "4:50 pm",
    "5:00 pm",
    "5:10 pm",
    "5:20 pm",
    "5:30 pm",
    "5:40 pm",
    "5:50 pm",
    "6:00 pm",
    "6:10 pm",
    "6:20 pm",
    "6:30 pm",
    "6:40 pm",
    "6:50 pm",
    "7:00 pm",
    "7:10 pm",
    "7:20 pm",
    "7:30 pm",
    "7:40 pm",
    "7:50 pm",
    "8:00 pm",
    "8:10 pm",
    "8:20 pm",
    "8:30 pm",
    "8:40 pm",
    "8:50 pm",
    "9:00 pm",
    "9:10 pm",
    "9:20 pm",
    "9:30 pm",
    "9:40 pm",
    "9:50 pm",
    "10:00 pm",
    "10:10 pm",
    "10:20 pm",
    "10:30 pm",
    "10:40 pm",
    "10:50 pm",
    "11:00 pm",
    "11:10 pm",
    "11:20 pm",
    "11:30 pm",
    "11:40 pm",
    "11:50 pm",
    "12:00 am",
];


export const EMOJIS_CODE: { key: string, value: string }[] = [
    {
        key: "1f600",
        value: "😀"
    },
    {
        key: "1f603",
        value: "😃"
    },
    {
        key: "1f604",
        value: "😄"
    },
    {
        key: "1f601",
        value: "😁"
    },
    {
        key: "1f606",
        value: "😆"
    },
    {
        key: "1f605",
        value: "😅"
    },
    {
        key: "1f602",
        value: "😂"
    },
    {
        key: "1f923",
        value: "🤣"
    },
    {
        key: "1f62d",
        value: "😭"
    },
    {
        key: "1f609",
        value: "😉"
    },
    {
        key: "1f617",
        value: "😗"
    },
    {
        key: "1f619",
        value: "😙"
    },
    {
        key: "1f61a",
        value: "😚"
    },
    {
        key: "1f618",
        value: "😘"
    },
    {
        key: "1f970",
        value: "🥰"
    },
    {
        key: "1f60d",
        value: "😍"
    },
    {
        key: "1f929",
        value: "🤩"
    },
    {
        key: "1f973",
        value: "🥳"
    },
    {
        key: "1fae0",
        value: "🫠"
    },
    {
        key: "1f643",
        value: "🙃"
    },
    {
        key: "1f642",
        value: "🙂"
    },
    {
        key: "1f972",
        value: "🥲"
    },
    {
        key: "1f979",
        value: "🥹"
    },
    {
        key: "1f60a",
        value: "😊"
    },
    {
        key: "1f60c",
        value: "😌"
    },
    {
        key: "1f60f",
        value: "😏"
    },
    {
        key: "1f634",
        value: "😴"
    },
    {
        key: "1f62a",
        value: "😪"
    },
    {
        key: "1f924",
        value: "🤤"
    },
    {
        key: "1f60b",
        value: "😋"
    },
    {
        key: "1f61b",
        value: "😛"
    },
    {
        key: "1f61d",
        value: "😝"
    },
    {
        key: "1f61c",
        value: "😜"
    },
    {
        key: "1f92a",
        value: "🤪"
    },
    {
        key: "1f974",
        value: "🥴"
    },
    {
        key: "1f614",
        value: "😔"
    },
    {
        key: "1f97a",
        value: "🥺"
    },
    {
        key: "1f62c",
        value: "😬"
    },
    {
        key: "1f611",
        value: "😑"
    },
    {
        key: "1f610",
        value: "😐"
    },
    {
        key: "1f636",
        value: "😶"
    },
    {
        key: "1fae5",
        value: "🫥"
    },
    {
        key: "1f910",
        value: "🤐"
    },
    {
        key: "1fae1",
        value: "🫡"
    },
    {
        key: "1f914",
        value: "🤔"
    },
    {
        key: "1f92b",
        value: "🤫"
    },
    {
        key: "1fae2",
        value: "🫢"
    },
    {
        key: "1f92d",
        value: "🤭"
    },
    {
        key: "1f971",
        value: "🥱"
    },
    {
        key: "1f917",
        value: "🤗"
    },
    {
        key: "1fae3",
        value: "🫣"
    },
    {
        key: "1f631",
        value: "😱"
    },
    {
        key: "1f928",
        value: "🤨"
    },
    {
        key: "1f9d0",
        value: "🧐"
    },
    {
        key: "1f612",
        value: "😒"
    },
    {
        key: "1f644",
        value: "🙄"
    },
    {
        key: "1f624",
        value: "😤"
    },
    {
        key: "1f620",
        value: "😠"
    },
    {
        key: "1f621",
        value: "😡"
    },
    {
        key: "1f92c",
        value: "🤬"
    },
    {
        key: "1f61e",
        value: "😞"
    },
    {
        key: "1f613",
        value: "😓"
    },
    {
        key: "1f61f",
        value: "😟"
    },
    {
        key: "1f625",
        value: "😥"
    },
    {
        key: "1f622",
        value: "😢"
    },
    {
        key: "1f641",
        value: "🙁"
    },
    {
        key: "1fae4",
        value: "🫤"
    },
    {
        key: "1f615",
        value: "😕"
    },
    {
        key: "1f630",
        value: "😰"
    },
    {
        key: "1f628",
        value: "😨"
    },
    {
        key: "1f627",
        value: "😧"
    },
    {
        key: "1f626",
        value: "😦"
    },
    {
        key: "1f62e",
        value: "😮"
    },
    {
        key: "1f62f",
        value: "😯"
    },
    {
        key: "1f632",
        value: "😲"
    },
    {
        key: "1f633",
        value: "😳"
    },
    {
        key: "1f92f",
        value: "🤯"
    },
    {
        key: "1f616",
        value: "😖"
    },
    {
        key: "1f623",
        value: "😣"
    },
    {
        key: "1f629",
        value: "😩"
    },
    {
        key: "1f62b",
        value: "😫"
    },
    {
        key: "1f635",
        value: "😵"
    },
    {
        key: "1fae8",
        value: "🫨"
    },
    {
        key: "1f976",
        value: "🥶"
    },
    {
        key: "1f975",
        value: "🥵"
    },
    {
        key: "1f922",
        value: "🤢"
    },
    {
        key: "1f92e",
        value: "🤮"
    },
    {
        key: "1f927",
        value: "🤧"
    },
    {
        key: "1f912",
        value: "🤒"
    },
    {
        key: "1f915",
        value: "🤕"
    },
    {
        key: "1f637",
        value: "😷"
    },
    {
        key: "1f925",
        value: "🤥"
    },
    {
        key: "1f607",
        value: "😇"
    },
    {
        key: "1f920",
        value: "🤠"
    },
    {
        key: "1f911",
        value: "🤑"
    },
    {
        key: "1f913",
        value: "🤓"
    },
    {
        key: "1f60e",
        value: "😎"
    },
    {
        key: "1f978",
        value: "🥸"
    },
    {
        key: "1f921",
        value: "🤡"
    },
    {
        key: "1f608",
        value: "😈"
    },
    {
        key: "1f47f",
        value: "👿"
    },
    {
        key: "1f47b",
        value: "👻"
    },
    {
        key: "1f383",
        value: "🎃"
    },
    {
        key: "1f4a9",
        value: "💩"
    },
    {
        key: "1f916",
        value: "🤖"
    },
    {
        key: "1f47d",
        value: "👽"
    },
    {
        key: "1f31b",
        value: "🌛"
    },
    {
        key: "1f31c",
        value: "🌜"
    },
    {
        key: "1f31e",
        value: "🌞"
    },
    {
        key: "1f525",
        value: "🔥"
    },
    {
        key: "1f4af",
        value: "💯"
    },
    {
        key: "1f31f",
        value: "🌟"
    },
    {
        key: "1f4a5",
        value: "💥"
    },
    {
        key: "1f389",
        value: "🎉"
    },
    {
        key: "1f648",
        value: "🙈"
    },
    {
        key: "1f649",
        value: "🙉"
    },
    {
        key: "1f64a",
        value: "🙊"
    },
    {
        key: "1f63a",
        value: "😺"
    },
    {
        key: "1f638",
        value: "😸"
    },
    {
        key: "1f639",
        value: "😹"
    },
    {
        key: "1f63b",
        value: "😻"
    },
    {
        key: "1f63c",
        value: "😼"
    },
    {
        key: "1f63d",
        value: "😽"
    },
    {
        key: "1f640",
        value: "🙀"
    },
    {
        key: "1f63f",
        value: "😿"
    },
    {
        key: "1f63e",
        value: "😾"
    },
    {
        key: "1f9e1",
        value: "🧡"
    },
    {
        key: "1f49b",
        value: "💛"
    },
    {
        key: "1f49a",
        value: "💚"
    },
    {
        key: "1fa75",
        value: "🩵"
    },
    {
        key: "1f499",
        value: "💙"
    },
    {
        key: "1f49c",
        value: "💜"
    },
    {
        key: "1f90e",
        value: "🤎"
    },
    {
        key: "1f5a4",
        value: "🖤"
    },
    {
        key: "1fa76",
        value: "🩶"
    },
    {
        key: "1f90d",
        value: "🤍"
    },
    {
        key: "1fa77",
        value: "🩷"
    },
    {
        key: "1f498",
        value: "💘"
    },
    {
        key: "1f49d",
        value: "💝"
    },
    {
        key: "1f496",
        value: "💖"
    },
    {
        key: "1f497",
        value: "💗"
    },
    {
        key: "1f493",
        value: "💓"
    },
    {
        key: "1f49e",
        value: "💞"
    },
    {
        key: "1f495",
        value: "💕"
    },
    {
        key: "1f48c",
        value: "💌"
    },
    {
        key: "1f494",
        value: "💔"
    },
    {
        key: "1f48b",
        value: "💋"
    },
    {
        key: "1f463",
        value: "👣"
    },
    {
        key: "1fac0",
        value: "🫀"
    },
    {
        key: "1fa78",
        value: "🩸"
    },
    {
        key: "1f9a0",
        value: "🦠"
    },
    {
        key: "1f480",
        value: "💀"
    },
    {
        key: "1f440",
        value: "👀"
    },
    {
        key: "1fae6",
        value: "🫦"
    },
    {
        key: "1f9bf",
        value: "🦿"
    },
    {
        key: "1f9be",
        value: "🦾"
    },
    {
        key: "1f4aa",
        value: "💪"
    },
    {
        key: "1f44f",
        value: "👏"
    },
    {
        key: "1f44d",
        value: "👍"
    },
    {
        key: "1f44e",
        value: "👎"
    },
    {
        key: "1f64c",
        value: "🙌"
    },
    {
        key: "1f44b",
        value: "👋"
    },
    {
        key: "1f91e",
        value: "🤞"
    },
    {
        key: "1f64f",
        value: "🙏"
    },
    {
        key: "1f483",
        value: "💃"
    },
    {
        key: "1f339",
        value: "🌹"
    },
    {
        key: "1f940",
        value: "🥀"
    },
    {
        key: "1f342",
        value: "🍂"
    },
    {
        key: "1f331",
        value: "🌱"
    },
    {
        key: "1f340",
        value: "🍀"
    },
    {
        key: "1f30b",
        value: "🌋"
    },
    {
        key: "1f305",
        value: "🌅"
    },
    {
        key: "1f304",
        value: "🌄"
    },
    {
        key: "1f308",
        value: "🌈"
    },
    {
        key: "26a1",
        value: "⚡"
    },
    {
        key: "1f4ab",
        value: "💫"
    },
    {
        key: "1f30d",
        value: "🌍"
    },
    {
        key: "1f984",
        value: "🦄"
    },
    {
        key: "1f98e",
        value: "🦎"
    },
    {
        key: "1f409",
        value: "🐉"
    },
    {
        key: "1f996",
        value: "🦖"
    },
    {
        key: "1f422",
        value: "🐢"
    },
    {
        key: "1f40d",
        value: "🐍"
    },
    {
        key: "1f438",
        value: "🐸"
    },
    {
        key: "1f407",
        value: "🐇"
    },
    {
        key: "1f400",
        value: "🐀"
    },
    {
        key: "1f415",
        value: "🐕"
    },
    {
        key: "1f416",
        value: "🐖"
    },
    {
        key: "1f40e",
        value: "🐎"
    },
    {
        key: "1facf",
        value: "🫏"
    },
    {
        key: "1f402",
        value: "🐂"
    },
    {
        key: "1f410",
        value: "🐐"
    },
    {
        key: "1f998",
        value: "🦘"
    },
    {
        key: "1f405",
        value: "🐅"
    },
    {
        key: "1f412",
        value: "🐒"
    },
    {
        key: "1f9a6",
        value: "🦦"
    },
    {
        key: "1f987",
        value: "🦇"
    },
    {
        key: "1f413",
        value: "🐓"
    },
    {
        key: "1f423",
        value: "🐣"
    },
    {
        key: "1f424",
        value: "🐤"
    },
    {
        key: "1f425",
        value: "🐥"
    },
    {
        key: "1f985",
        value: "🦅"
    },
    {
        key: "1fabf",
        value: "🪿"
    },
    {
        key: "1f99a",
        value: "🦚"
    },
    {
        key: "1f9ad",
        value: "🦭"
    },
    {
        key: "1f42c",
        value: "🐬"
    },
    {
        key: "1f433",
        value: "🐳"
    },
    {
        key: "1f421",
        value: "🐡"
    },
    {
        key: "1f980",
        value: "🦀"
    },
    {
        key: "1f419",
        value: "🐙"
    },
    {
        key: "1fabc",
        value: "🪼"
    },
    {
        key: "1f40c",
        value: "🐌"
    },
    {
        key: "1f41c",
        value: "🐜"
    },
    {
        key: "1f99f",
        value: "🦟"
    },
    {
        key: "1f41d",
        value: "🐝"
    },
    {
        key: "1f98b",
        value: "🦋"
    },
    {
        key: "1f43e",
        value: "🐾"
    },
    {
        key: "1f345",
        value: "🍅"
    },
    {
        key: "1f37f",
        value: "🍿"
    },
    {
        key: "1f37b",
        value: "🍻"
    },
    {
        key: "1f942",
        value: "🥂"
    },
    {
        key: "1f37e",
        value: "🍾"
    },
    {
        key: "1f377",
        value: "🍷"
    },
    {
        key: "1f379",
        value: "🍹"
    },
    {
        key: "1f6a8",
        value: "🚨"
    },
    {
        key: "1f6f8",
        value: "🛸"
    },
    {
        key: "1f680",
        value: "🚀"
    },
    {
        key: "1f6eb",
        value: "🛫"
    },
    {
        key: "1f6ec",
        value: "🛬"
    },
    {
        key: "1f3a2",
        value: "🎢"
    },
    {
        key: "1f38a",
        value: "🎊"
    },
    {
        key: "1f388",
        value: "🎈"
    },
    {
        key: "1f382",
        value: "🎂"
    },
    {
        key: "1f386",
        value: "🎆"
    },
    {
        key: "1faa9",
        value: "🪩"
    },
    {
        key: "26bd",
        value: "⚽"
    },
    {
        key: "1f3af",
        value: "🎯"
    },
    {
        key: "1f3bb",
        value: "🎻"
    },
    {
        key: "1f941",
        value: "🥁"
    },
    {
        key: "1fa87",
        value: "🪇"
    },
    {
        key: "1f50b",
        value: "🔋"
    },
    {
        key: "1faab",
        value: "🪫"
    },
    {
        key: "1f4b8",
        value: "💸"
    },
    {
        key: "1f4a1",
        value: "💡"
    },
    {
        key: "1f393",
        value: "🎓"
    },
    {
        key: "1f48e",
        value: "💎"
    },
    {
        key: "23f0",
        value: "⏰"
    },
    {
        key: "1f514",
        value: "🔔"
    },
    {
        key: "274c",
        value: "❌"
    },
    {
        key: "1f3b6",
        value: "🎶"
    },
    {
        key: "1f192",
        value: "🆒"
    },
    {
        key: "1f3c1",
        value: "🏁"
    },
    {
        key: "2615",
        value: "☕"
    },
    {
        key: "2705",
        value: "✅"
    },
    {
        key: "2728",
        value: "✨"
    },
    {
        key: "2648",
        value: "♈"
    },
    {
        key: "2649",
        value: "♉"
    },
    {
        key: "2650",
        value: "♐"
    },
    {
        key: "2651",
        value: "♑"
    },
    {
        key: "2652",
        value: "♒"
    },
    {
        key: "2653",
        value: "♓"
    },
    {
        key: "2795",
        value: "➕"
    },
    {
        key: "264a",
        value: "♊"
    },
    {
        key: "264b",
        value: "♋"
    },
    {
        key: "264c",
        value: "♌"
    },
    {
        key: "264d",
        value: "♍"
    },
    {
        key: "264e",
        value: "♎"
    },
    {
        key: "264f",
        value: "♏"
    },
    {
        key: "26ce",
        value: "⛎"
    }
];