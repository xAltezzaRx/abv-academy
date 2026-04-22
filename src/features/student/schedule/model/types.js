/**
 * @typedef {Object} Lesson
 * @property {string} time
 * @property {string} subject
 * @property {string} teacher
 * @property {string} room
 * @property {string} [description]
 */

/**
 * @typedef {Object} ScheduleDay
 * @property {string} dayLabel
 * @property {string} dateLabel
 * @property {boolean} [isToday]
 * @property {Lesson[]} lessons
 */

export {};