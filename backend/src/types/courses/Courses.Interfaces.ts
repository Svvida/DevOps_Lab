import ExcelJS from 'exceljs';
import { DegreeCourse } from 'entities/courses/DegreeCourse.Entity';
import { DegreePath } from 'entities/courses/DegreePath.Entity';
import { Module } from 'entities/courses/Module.Entity';
import { Subject } from 'entities/courses/Subject.Entity';

export interface ICoursesBaseSchema {
    id: number;
    name: string;
}

export interface IDegreeCourse extends ICoursesBaseSchema {
    degreePaths: DegreePath[];
    subjects: Subject[];
}

export interface IDegreePath extends ICoursesBaseSchema {
    degreeCourse: DegreeCourse;
    modules: Module[];
}

export interface IModule extends ICoursesBaseSchema {
    degreePath: DegreePath;
    subjects: Subject[];
}

export interface ISubject extends ICoursesBaseSchema {
    degreeCourses: DegreeCourse[];
    modules: Module[];
}

export interface IParsedRowData {
    degreeCourse: string;
    degreePath: string;
    module: string;
    subject: string;
}

export interface IDataParser {
    parseFiles(): Promise<IParsedRowData[]>;
    loadWorkbook(filePath: string): Promise<ExcelJS.Workbook>;
    parseWorkbook(workbook: ExcelJS.Workbook, degreeCourseName: string): IParsedRowData[];
    parseWorksheet(worksheet: ExcelJS.Worksheet, degreeCourse: string, degreePath: string): IParsedRowData[];
}

export interface IDataSaver {
    saveParsedData(parsedData: IParsedRowData[]): Promise<void>;
}
