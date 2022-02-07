import seedrandom from "seedrandom";
import { GameMode } from "./enums";
import wordList from "./words_5";

export const ROWS = 6;
export const COLS = 5;

export const words = {
	...wordList,
	contains: (word: string) => {
		return wordList.words.includes(word) || wordList.valid.includes(word);
	},
};

export function checkHardMode(board: GameBoard, row: number): HardModeData {
	for (let i = 0; i < COLS; ++i) {
		if (board.state[row - 1][i] === "🟩" && board.words[row - 1][i] !== board.words[row][i]) {
			return { pos: i, char: board.words[row - 1][i], type: "🟩" };
		}
	}
	for (let i = 0; i < COLS; ++i) {
		if (board.state[row - 1][i] === "🟨" && !board.words[row].includes(board.words[row - 1][i])) {
			return { pos: i, char: board.words[row - 1][i], type: "🟨" };
		}
	}
	return { pos: -1, char: "", type: "⬛" };
}

export function getRowData(n: number, board: GameBoard) {
	const wordData = {
		// letters not contained
		not: [],
		// for letters contained in the word that are not the same as any that are in the correct place
		contained: new Set<string>(),
		letters: Array.from({ length: COLS }, () => ({ val: null, not: new Set<string>() })),
	};
	for (let row = 0; row < n; ++row) {
		for (let col = 0; col < COLS; ++col)
			if (board.state[row][col] === "🟨") {
				wordData.contained.add(board.words[row][col]);
				wordData.letters[col].not.add(board.words[row][col]);
			} else if (board.state[row][col] === "🟩") {
				wordData.contained.delete(board.words[row][col]);
				wordData.letters[col].val = board.words[row][col];
			} else {
				wordData.not.push(board.words[row][col]);
			}
	}
	let exp = "";
	for (let i = 0; i < COLS; ++i) {
		exp += wordData.letters[i].val
			? wordData.letters[i].val
			: `[^${[...wordData.not, ...wordData.letters[i].not].join(" ")}]`;
	}
	return (word: string) => {
		if (new RegExp(exp).test(word)) {
			for (const char of wordData.contained) {
				if (!word.includes(char)) return false;
			}
			return true;
		}
		return false;
	};
}

export function getState(word: string, guess: string): LetterState[] {
	const charArr = word.split("");
	const result = Array<LetterState>(5).fill("⬛");
	for (let i = 0; i < word.length; ++i) {
		if (charArr[i] === guess.charAt(i)) {
			result[i] = "🟩";
			charArr[i] = "$";
		}
	}
	return result.map((e, i) => charArr.includes(guess[i]) && e !== "🟩" ? "🟨" : e);
}

export function contractNum(n: number) {
	switch (n % 10) {
		case 1: return `${n}st`;
		case 2: return `${n}nd`;
		case 3: return `${n}rd`;
		default: return `${n}rd`;
	}
}

export const keys = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];

export function newSeed(mode: GameMode) {
	const today = new Date();
	var there = changeTimezone(today, "America/Toronto");
	switch (mode) {
		case GameMode.daily:
			return new Date(there.getFullYear(), there.getMonth(), there.getDate()).valueOf();
		case GameMode.hourly:
			return new Date(there.getFullYear(),  there.getMonth(), there.getDate(), there.getHours()).valueOf();
		case GameMode.infinite:
			return new Date(there.getFullYear(), there.getMonth(), there.getDate(), there.getHours(), there.getMinutes(), there.getSeconds()).valueOf();
	}

	
}

export function changeTimezone(date, ianatz) {

  var invdate = new Date(date.toLocaleString('en-US', {
    timeZone: ianatz
  }));

  var diff = date.getTime() - invdate.getTime();

  return new Date(date.getTime() - diff);

}

export function getWordNumber(mode: GameMode) {
	return Math.round((modeData.modes[mode].seed - modeData.modes[mode].start) / modeData.modes[mode].unit) + 1;
}

export function seededRandomInt(min: number, max: number, seed: number) {
	const rng = seedrandom(`${seed}`);
	return Math.floor(min + (max - min) * rng());
}

export const DELAY_INCREMENT = 150;

export const PRAISE = [
	"Genius",
	"Magnificent",
	"Impressive",
	"Splendid",
	"Great",
	"Phew",
];

export function createNewGame(mode: GameMode): GameState {
	return {
		active: true,
		guesses: 0,
		time: modeData.modes[mode].seed,
		wordNumber: getWordNumber(mode),
		validHard: true,
		board: {
			words: Array(ROWS).fill(""),
			state: Array.from({ length: ROWS }, () => (Array(COLS).fill("🔳")))
		},
	};
}

export function createDefaultSettings(): Settings {
	return {
		hard: new Array(modeData.modes.length).map(() => false),
		dark: true,
		colorblind: false,
		tutorial: 2,
	};
}

export function createDefaultStats(mode: GameMode): Stats {
	const stats = {
		played: 0,
		lastGame: 0,
		guesses: {
			fail: 0,
			1: 0,
			2: 0,
			3: 0,
			4: 0,
			5: 0,
			6: 0,
		}
	};
	if (!modeData.modes[mode].streak) return stats;
	return {
		...stats,
		streak: 0,
		maxStreak: 0,
	};
};

export function createLetterStates(): { [key: string]: LetterState; } {
	return {
		a: "🔳",
		b: "🔳",
		c: "🔳",
		d: "🔳",
		e: "🔳",
		f: "🔳",
		g: "🔳",
		h: "🔳",
		i: "🔳",
		j: "🔳",
		k: "🔳",
		l: "🔳",
		m: "🔳",
		n: "🔳",
		o: "🔳",
		p: "🔳",
		q: "🔳",
		r: "🔳",
		s: "🔳",
		t: "🔳",
		u: "🔳",
		v: "🔳",
		w: "🔳",
		x: "🔳",
		y: "🔳",
		z: "🔳",
	};
}

export const definitions = new Map<string, Promise<DictionaryEntry>>();
