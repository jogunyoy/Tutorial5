// Task 1: let, const and block scope

// assignments: array of { id, grade, daysLate } objects
function summarizeGrades(assignments) {
    let sum = 0;
    const count = assignments.length;

    // The late penalty is 20 percentage points per day,
    // not a percentage of the grade.
    const LATE_PENALTY_PER_DAY = 20;

    // Declared before the loop because it's used after it
    let assignment;

    for (let i = 0; i < count; i++) {
        assignment = assignments[i];
        let grade = assignment.grade;

        if (assignment.daysLate > 0) {
            const latePenalty = assignment.daysLate * LATE_PENALTY_PER_DAY;
            // The minimum grade allowed is 0.
            grade = grade - latePenalty >= 0 ? grade - latePenalty : 0;
        }
        sum += grade;
    }

    const lastGraded = assignment;
    return { average: sum / count, lastGraded: lastGraded.id };
}

// Example test
const assignments = [
    { id: "1234", grade: 80, daysLate: 2 },
    { id: "5678", grade: 50, daysLate: 0 },
    { id: "9876", grade: 30, daysLate: 2 },
];
console.log(summarizeGrades(assignments));


// Task 2: Closures

// letter: single letter to count
// ignoreCapitalization: if true, count both upper and lower case
const letterCounter = function (letter, ignoreCapitalization) {
    // When ignoring case, compare everything in lowercase
    const targetLetter = ignoreCapitalization ? letter.toLowerCase() : letter;

    // word: the word to search
    const countLetter = function (word) {
        const searchableWord = ignoreCapitalization ? word.toLowerCase() : word;

        let occurrences = 0;
        for (const character of searchableWord) {
            if (character === targetLetter) {
                occurrences++;
            }
        }
        return occurrences;
    };

    return countLetter;
};

// characterName: name of the character
function makeCharacter(characterName) {
    const MAX_SKILL_LEVEL = 10;

    // Private via closure: only levelUp and showSkill can access these
    let farmingSkill = 0;
    let fishingSkill = 0;

    // skill: "farming" or "fishing" (anything else is ignored)
    const levelUp = function (skill) {
        if (skill === "farming" && farmingSkill < MAX_SKILL_LEVEL) {
            farmingSkill++;
        } else if (skill === "fishing" && fishingSkill < MAX_SKILL_LEVEL) {
            fishingSkill++;
        }
    };

    // skill: "farming" or "fishing" (anything else returns nothing)
    const showSkill = function (skill) {
        if (skill === "farming") {
            return farmingSkill;
        }
        if (skill === "fishing") {
            return fishingSkill;
        }
    };

    return {
        name: characterName,
        levelUp,
        showSkill
    };
}
