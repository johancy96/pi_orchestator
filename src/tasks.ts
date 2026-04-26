import * as fs from 'fs';
import * as path from 'path';
import { Task } from './state';

const TASK_FILE_PATH = path.join(process.cwd(), 'plan', 'task.md');

export const parseTasks = (): Task[] => {
  if (!fs.existsSync(TASK_FILE_PATH)) {
    return [];
  }

  try {
    const content = fs.readFileSync(TASK_FILE_PATH, 'utf-8');
    const lines = content.split('\n');
    const tasks: Task[] = [];
    
    let taskId = 1;
    for (const line of lines) {
      const match = line.match(/^(\s*)-\s+\[([ xX])\]\s+(.*)/);
      if (match) {
        const isDone = match[2].toLowerCase() === 'x';
        const description = match[3].trim();
        tasks.push({
          id: `task-${taskId++}`,
          description,
          isDone
        });
      }
    }
    return tasks;
  } catch (error) {
    console.error('Error reading task.md:', error);
    return [];
  }
};
