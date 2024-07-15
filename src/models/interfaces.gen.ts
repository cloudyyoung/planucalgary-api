/* tslint:disable */
/* eslint-disable */

// ######################################## THIS FILE WAS GENERATED BY MONGOOSE-TSGEN ######################################## //

// NOTE: ANY CHANGES MADE WILL BE OVERWRITTEN ON SUBSEQUENT EXECUTIONS OF MONGOOSE-TSGEN.

import mongoose from "mongoose";

/**
 * Lean version of AccountDocument
 * 
 * This has all Mongoose getters & functions removed. This type will be returned from `AccountDocument.toObject()`. To avoid conflicts with model names, use the type alias `AccountObject`.
 * ```
 * const accountObject = account.toObject();
 * ```
 */
export type Account = {
programs: string[];
courses: any[];
username: string;
email: string;
password: string;
_id: mongoose.Types.ObjectId;
createdAt?: Date;
updatedAt?: Date;
}

/**
 * Lean version of AccountDocument (type alias of `Account`)
 * 
 * Use this type alias to avoid conflicts with model names:
 * ```
 * import { Account } from "../models"
 * import { AccountObject } from "../interfaces/mongoose.gen.ts"
 * 
 * const accountObject: AccountObject = account.toObject();
 * ```
 */
export type AccountObject = Account

/**
 * Mongoose Query type
 * 
 * This type is returned from query functions. For most use cases, you should not need to use this type explicitly.
 */
export type AccountQuery = mongoose.Query<any, AccountDocument, AccountQueries> & AccountQueries

/**
 * Mongoose Query helper types
 * 
 * This type represents `AccountSchema.query`. For most use cases, you should not need to use this type explicitly.
 */
export type AccountQueries = {
}

export type AccountMethods = {
getStudentRecord: (this: AccountDocument, ...args: any[]) => any;
}

export type AccountStatics = {
}

/**
 * Mongoose Model type
 * 
 * Pass this type to the Mongoose Model constructor:
 * ```
 * const Account = mongoose.model<AccountDocument, AccountModel>("Account", AccountSchema);
 * ```
 */
export type AccountModel = mongoose.Model<AccountDocument, AccountQueries> & AccountStatics

/**
 * Mongoose Schema type
 * 
 * Assign this type to new Account schema instances:
 * ```
 * const AccountSchema: AccountSchema = new mongoose.Schema({ ... })
 * ```
 */
export type AccountSchema = mongoose.Schema<AccountDocument, AccountModel, AccountMethods, AccountQueries>

/**
 * Mongoose Document type
 * 
 * Pass this type to the Mongoose Model constructor:
 * ```
 * const Account = mongoose.model<AccountDocument, AccountModel>("Account", AccountSchema);
 * ```
 */
export type AccountDocument = mongoose.Document<mongoose.Types.ObjectId, AccountQueries> & AccountMethods & {
programs: mongoose.Types.Array<string>;
courses: mongoose.Types.Array<any>;
username: string;
email: string;
password: string;
_id: mongoose.Types.ObjectId;
createdAt?: Date;
updatedAt?: Date;
}

/**
 * Lean version of CatalogCourseSetDocument
 * 
 * This has all Mongoose getters & functions removed. This type will be returned from `CatalogCourseSetDocument.toObject()`. To avoid conflicts with model names, use the type alias `CatalogCourseSetObject`.
 * ```
 * const catalogcoursesetObject = catalogcourseset.toObject();
 * ```
 */
export type CatalogCourseSet = {
course_list: string[];
description?: string;
id: string;
name: string;
structure: Map<string, any>;
type: "static" | "dynamic";
_id: mongoose.Types.ObjectId;
createdAt?: Date;
updatedAt?: Date;
}

/**
 * Lean version of CatalogCourseSetDocument (type alias of `CatalogCourseSet`)
 * 
 * Use this type alias to avoid conflicts with model names:
 * ```
 * import { CatalogCourseSet } from "../models"
 * import { CatalogCourseSetObject } from "../interfaces/mongoose.gen.ts"
 * 
 * const catalogcoursesetObject: CatalogCourseSetObject = catalogcourseset.toObject();
 * ```
 */
export type CatalogCourseSetObject = CatalogCourseSet

/**
 * Mongoose Query type
 * 
 * This type is returned from query functions. For most use cases, you should not need to use this type explicitly.
 */
export type CatalogCourseSetQuery = mongoose.Query<any, CatalogCourseSetDocument, CatalogCourseSetQueries> & CatalogCourseSetQueries

/**
 * Mongoose Query helper types
 * 
 * This type represents `CatalogCourseSetSchema.query`. For most use cases, you should not need to use this type explicitly.
 */
export type CatalogCourseSetQueries = {
}

export type CatalogCourseSetMethods = {
}

export type CatalogCourseSetStatics = {
}

/**
 * Mongoose Model type
 * 
 * Pass this type to the Mongoose Model constructor:
 * ```
 * const CatalogCourseSet = mongoose.model<CatalogCourseSetDocument, CatalogCourseSetModel>("CatalogCourseSet", CatalogCourseSetSchema);
 * ```
 */
export type CatalogCourseSetModel = mongoose.Model<CatalogCourseSetDocument, CatalogCourseSetQueries> & CatalogCourseSetStatics

/**
 * Mongoose Schema type
 * 
 * Assign this type to new CatalogCourseSet schema instances:
 * ```
 * const CatalogCourseSetSchema: CatalogCourseSetSchema = new mongoose.Schema({ ... })
 * ```
 */
export type CatalogCourseSetSchema = mongoose.Schema<CatalogCourseSetDocument, CatalogCourseSetModel, CatalogCourseSetMethods, CatalogCourseSetQueries>

/**
 * Mongoose Document type
 * 
 * Pass this type to the Mongoose Model constructor:
 * ```
 * const CatalogCourseSet = mongoose.model<CatalogCourseSetDocument, CatalogCourseSetModel>("CatalogCourseSet", CatalogCourseSetSchema);
 * ```
 */
export type CatalogCourseSetDocument = mongoose.Document<mongoose.Types.ObjectId, CatalogCourseSetQueries> & CatalogCourseSetMethods & {
course_list: mongoose.Types.Array<string>;
description?: string;
id: string;
name: string;
structure: mongoose.Types.Map<any>;
type: "static" | "dynamic";
_id: mongoose.Types.ObjectId;
createdAt?: Date;
updatedAt?: Date;
}

/**
 * Lean version of CatalogCourseDocument
 * 
 * This has all Mongoose getters & functions removed. This type will be returned from `CatalogCourseDocument.toObject()`. To avoid conflicts with model names, use the type alias `CatalogCourseObject`.
 * ```
 * const catalogcourseObject = catalogcourse.toObject();
 * ```
 */
export type CatalogCourse = {
active: boolean;
aka?: string;
antireq?: any;
antireq_text?: string;
career: string;
cid: string;
code: string;
components: string[];
coreq?: any;
coreq_text?: string;
course_group_id: string;
course_number: string;
coursedog_id: string;
units: number;
departments: string[];
description?: string;
faculty_code: string;
faculty_name: string;
grade_mode_code: string;
grade_mode_name: string;
long_name: string;
multi_term: boolean;
name: string;
nogpa: boolean;
notes?: string;
prereq?: any;
prereq_text?: string;
repeatable?: boolean;
start_term: string;
subject_code: string;
topics: (Map<string, any>)[];
version?: number;
_id: mongoose.Types.ObjectId;
createdAt?: Date;
updatedAt?: Date;
}

/**
 * Lean version of CatalogCourseDocument (type alias of `CatalogCourse`)
 * 
 * Use this type alias to avoid conflicts with model names:
 * ```
 * import { CatalogCourse } from "../models"
 * import { CatalogCourseObject } from "../interfaces/mongoose.gen.ts"
 * 
 * const catalogcourseObject: CatalogCourseObject = catalogcourse.toObject();
 * ```
 */
export type CatalogCourseObject = CatalogCourse

/**
 * Mongoose Query type
 * 
 * This type is returned from query functions. For most use cases, you should not need to use this type explicitly.
 */
export type CatalogCourseQuery = mongoose.Query<any, CatalogCourseDocument, CatalogCourseQueries> & CatalogCourseQueries

/**
 * Mongoose Query helper types
 * 
 * This type represents `CatalogCourseSchema.query`. For most use cases, you should not need to use this type explicitly.
 */
export type CatalogCourseQueries = {
}

export type CatalogCourseMethods = {
}

export type CatalogCourseStatics = {
}

/**
 * Mongoose Model type
 * 
 * Pass this type to the Mongoose Model constructor:
 * ```
 * const CatalogCourse = mongoose.model<CatalogCourseDocument, CatalogCourseModel>("CatalogCourse", CatalogCourseSchema);
 * ```
 */
export type CatalogCourseModel = mongoose.Model<CatalogCourseDocument, CatalogCourseQueries> & CatalogCourseStatics

/**
 * Mongoose Schema type
 * 
 * Assign this type to new CatalogCourse schema instances:
 * ```
 * const CatalogCourseSchema: CatalogCourseSchema = new mongoose.Schema({ ... })
 * ```
 */
export type CatalogCourseSchema = mongoose.Schema<CatalogCourseDocument, CatalogCourseModel, CatalogCourseMethods, CatalogCourseQueries>

/**
 * Mongoose Document type
 * 
 * Pass this type to the Mongoose Model constructor:
 * ```
 * const CatalogCourse = mongoose.model<CatalogCourseDocument, CatalogCourseModel>("CatalogCourse", CatalogCourseSchema);
 * ```
 */
export type CatalogCourseDocument = mongoose.Document<mongoose.Types.ObjectId, CatalogCourseQueries> & CatalogCourseMethods & {
active: boolean;
aka?: string;
antireq?: any;
antireq_text?: string;
career: string;
cid: string;
code: string;
components: mongoose.Types.Array<string>;
coreq?: any;
coreq_text?: string;
course_group_id: string;
course_number: string;
coursedog_id: string;
units: number;
departments: mongoose.Types.Array<string>;
description?: string;
faculty_code: string;
faculty_name: string;
grade_mode_code: string;
grade_mode_name: string;
long_name: string;
multi_term: boolean;
name: string;
nogpa: boolean;
notes?: string;
prereq?: any;
prereq_text?: string;
repeatable?: boolean;
start_term: string;
subject_code: string;
topics: mongoose.Types.Array<mongoose.Types.Map<any>>;
version?: number;
_id: mongoose.Types.ObjectId;
createdAt?: Date;
updatedAt?: Date;
}

/**
 * Lean version of CatalogDepartmentDocument
 * 
 * This has all Mongoose getters & functions removed. This type will be returned from `CatalogDepartmentDocument.toObject()`. To avoid conflicts with model names, use the type alias `CatalogDepartmentObject`.
 * ```
 * const catalogdepartmentObject = catalogdepartment.toObject();
 * ```
 */
export type CatalogDepartment = {
id: string;
display_name: string;
name: string;
_id: mongoose.Types.ObjectId;
createdAt?: Date;
updatedAt?: Date;
}

/**
 * Lean version of CatalogDepartmentDocument (type alias of `CatalogDepartment`)
 * 
 * Use this type alias to avoid conflicts with model names:
 * ```
 * import { CatalogDepartment } from "../models"
 * import { CatalogDepartmentObject } from "../interfaces/mongoose.gen.ts"
 * 
 * const catalogdepartmentObject: CatalogDepartmentObject = catalogdepartment.toObject();
 * ```
 */
export type CatalogDepartmentObject = CatalogDepartment

/**
 * Mongoose Query type
 * 
 * This type is returned from query functions. For most use cases, you should not need to use this type explicitly.
 */
export type CatalogDepartmentQuery = mongoose.Query<any, CatalogDepartmentDocument, CatalogDepartmentQueries> & CatalogDepartmentQueries

/**
 * Mongoose Query helper types
 * 
 * This type represents `CatalogDepartmentSchema.query`. For most use cases, you should not need to use this type explicitly.
 */
export type CatalogDepartmentQueries = {
}

export type CatalogDepartmentMethods = {
}

export type CatalogDepartmentStatics = {
}

/**
 * Mongoose Model type
 * 
 * Pass this type to the Mongoose Model constructor:
 * ```
 * const CatalogDepartment = mongoose.model<CatalogDepartmentDocument, CatalogDepartmentModel>("CatalogDepartment", CatalogDepartmentSchema);
 * ```
 */
export type CatalogDepartmentModel = mongoose.Model<CatalogDepartmentDocument, CatalogDepartmentQueries> & CatalogDepartmentStatics

/**
 * Mongoose Schema type
 * 
 * Assign this type to new CatalogDepartment schema instances:
 * ```
 * const CatalogDepartmentSchema: CatalogDepartmentSchema = new mongoose.Schema({ ... })
 * ```
 */
export type CatalogDepartmentSchema = mongoose.Schema<CatalogDepartmentDocument, CatalogDepartmentModel, CatalogDepartmentMethods, CatalogDepartmentQueries>

/**
 * Mongoose Document type
 * 
 * Pass this type to the Mongoose Model constructor:
 * ```
 * const CatalogDepartment = mongoose.model<CatalogDepartmentDocument, CatalogDepartmentModel>("CatalogDepartment", CatalogDepartmentSchema);
 * ```
 */
export type CatalogDepartmentDocument = mongoose.Document<mongoose.Types.ObjectId, CatalogDepartmentQueries> & CatalogDepartmentMethods & {
id: string;
display_name: string;
name: string;
_id: mongoose.Types.ObjectId;
createdAt?: Date;
updatedAt?: Date;
}

/**
 * Lean version of CatalogProgramDocument
 * 
 * This has all Mongoose getters & functions removed. This type will be returned from `CatalogProgramDocument.toObject()`. To avoid conflicts with model names, use the type alias `CatalogProgramObject`.
 * ```
 * const catalogprogramObject = catalogprogram.toObject();
 * ```
 */
export type CatalogProgram = {
active?: boolean;
admission_info: string;
career: string;
code: string;
coursedog_id: string;
degree_designation_code: string;
degree_designation_name: string;
departments: string[];
display_name: string;
general_info: string;
long_name: string;
name: string;
program_group_id: string;
start_term: Map<string, any>;
transcript_description: string;
transcript_level: string;
type: string;
version: number;
_id: mongoose.Types.ObjectId;
}

/**
 * Lean version of CatalogProgramDocument (type alias of `CatalogProgram`)
 * 
 * Use this type alias to avoid conflicts with model names:
 * ```
 * import { CatalogProgram } from "../models"
 * import { CatalogProgramObject } from "../interfaces/mongoose.gen.ts"
 * 
 * const catalogprogramObject: CatalogProgramObject = catalogprogram.toObject();
 * ```
 */
export type CatalogProgramObject = CatalogProgram

/**
 * Mongoose Query type
 * 
 * This type is returned from query functions. For most use cases, you should not need to use this type explicitly.
 */
export type CatalogProgramQuery = mongoose.Query<any, CatalogProgramDocument, CatalogProgramQueries> & CatalogProgramQueries

/**
 * Mongoose Query helper types
 * 
 * This type represents `CatalogProgramSchema.query`. For most use cases, you should not need to use this type explicitly.
 */
export type CatalogProgramQueries = {
}

export type CatalogProgramMethods = {
}

export type CatalogProgramStatics = {
}

/**
 * Mongoose Model type
 * 
 * Pass this type to the Mongoose Model constructor:
 * ```
 * const CatalogProgram = mongoose.model<CatalogProgramDocument, CatalogProgramModel>("CatalogProgram", CatalogProgramSchema);
 * ```
 */
export type CatalogProgramModel = mongoose.Model<CatalogProgramDocument, CatalogProgramQueries> & CatalogProgramStatics

/**
 * Mongoose Schema type
 * 
 * Assign this type to new CatalogProgram schema instances:
 * ```
 * const CatalogProgramSchema: CatalogProgramSchema = new mongoose.Schema({ ... })
 * ```
 */
export type CatalogProgramSchema = mongoose.Schema<CatalogProgramDocument, CatalogProgramModel, CatalogProgramMethods, CatalogProgramQueries>

/**
 * Mongoose Document type
 * 
 * Pass this type to the Mongoose Model constructor:
 * ```
 * const CatalogProgram = mongoose.model<CatalogProgramDocument, CatalogProgramModel>("CatalogProgram", CatalogProgramSchema);
 * ```
 */
export type CatalogProgramDocument = mongoose.Document<mongoose.Types.ObjectId, CatalogProgramQueries> & CatalogProgramMethods & {
active?: boolean;
admission_info: string;
career: string;
code: string;
coursedog_id: string;
degree_designation_code: string;
degree_designation_name: string;
departments: mongoose.Types.Array<string>;
display_name: string;
general_info: string;
long_name: string;
name: string;
program_group_id: string;
start_term: mongoose.Types.Map<any>;
transcript_description: string;
transcript_level: string;
type: string;
version: number;
_id: mongoose.Types.ObjectId;
}

/**
 * Lean version of CatalogRequisiteSetDocument
 * 
 * This has all Mongoose getters & functions removed. This type will be returned from `CatalogRequisiteSetDocument.toObject()`. To avoid conflicts with model names, use the type alias `CatalogRequisiteSetObject`.
 * ```
 * const catalogrequisitesetObject = catalogrequisiteset.toObject();
 * ```
 */
export type CatalogRequisiteSet = {
description?: string;
id: string;
name: string;
requisite_set_group_id: string;
requisites: any[];
version: number;
_id: mongoose.Types.ObjectId;
createdAt?: Date;
updatedAt?: Date;
}

/**
 * Lean version of CatalogRequisiteSetDocument (type alias of `CatalogRequisiteSet`)
 * 
 * Use this type alias to avoid conflicts with model names:
 * ```
 * import { CatalogRequisiteSet } from "../models"
 * import { CatalogRequisiteSetObject } from "../interfaces/mongoose.gen.ts"
 * 
 * const catalogrequisitesetObject: CatalogRequisiteSetObject = catalogrequisiteset.toObject();
 * ```
 */
export type CatalogRequisiteSetObject = CatalogRequisiteSet

/**
 * Mongoose Query type
 * 
 * This type is returned from query functions. For most use cases, you should not need to use this type explicitly.
 */
export type CatalogRequisiteSetQuery = mongoose.Query<any, CatalogRequisiteSetDocument, CatalogRequisiteSetQueries> & CatalogRequisiteSetQueries

/**
 * Mongoose Query helper types
 * 
 * This type represents `CatalogRequisiteSetSchema.query`. For most use cases, you should not need to use this type explicitly.
 */
export type CatalogRequisiteSetQueries = {
}

export type CatalogRequisiteSetMethods = {
}

export type CatalogRequisiteSetStatics = {
}

/**
 * Mongoose Model type
 * 
 * Pass this type to the Mongoose Model constructor:
 * ```
 * const CatalogRequisiteSet = mongoose.model<CatalogRequisiteSetDocument, CatalogRequisiteSetModel>("CatalogRequisiteSet", CatalogRequisiteSetSchema);
 * ```
 */
export type CatalogRequisiteSetModel = mongoose.Model<CatalogRequisiteSetDocument, CatalogRequisiteSetQueries> & CatalogRequisiteSetStatics

/**
 * Mongoose Schema type
 * 
 * Assign this type to new CatalogRequisiteSet schema instances:
 * ```
 * const CatalogRequisiteSetSchema: CatalogRequisiteSetSchema = new mongoose.Schema({ ... })
 * ```
 */
export type CatalogRequisiteSetSchema = mongoose.Schema<CatalogRequisiteSetDocument, CatalogRequisiteSetModel, CatalogRequisiteSetMethods, CatalogRequisiteSetQueries>

/**
 * Mongoose Document type
 * 
 * Pass this type to the Mongoose Model constructor:
 * ```
 * const CatalogRequisiteSet = mongoose.model<CatalogRequisiteSetDocument, CatalogRequisiteSetModel>("CatalogRequisiteSet", CatalogRequisiteSetSchema);
 * ```
 */
export type CatalogRequisiteSetDocument = mongoose.Document<mongoose.Types.ObjectId, CatalogRequisiteSetQueries> & CatalogRequisiteSetMethods & {
description?: string;
id: string;
name: string;
requisite_set_group_id: string;
requisites: mongoose.Types.Array<any>;
version: number;
_id: mongoose.Types.ObjectId;
createdAt?: Date;
updatedAt?: Date;
}

/**
 * Check if a property on a document is populated:
 * ```
 * import { IsPopulated } from "../interfaces/mongoose.gen.ts"
 * 
 * if (IsPopulated<UserDocument["bestFriend"]>) { ... }
 * ```
 */
export function IsPopulated<T>(doc: T | mongoose.Types.ObjectId): doc is T {
  return doc instanceof mongoose.Document;
}

/**
 * Helper type used by `PopulatedDocument`. Returns the parent property of a string 
 * representing a nested property (i.e. `friend.user` -> `friend`)
 */
type ParentProperty<T> = T extends `${infer P}.${string}` ? P : never;

/**
* Helper type used by `PopulatedDocument`. Returns the child property of a string 
* representing a nested property (i.e. `friend.user` -> `user`).
*/
type ChildProperty<T> = T extends `${string}.${infer C}` ? C : never;

/**
* Helper type used by `PopulatedDocument`. Removes the `ObjectId` from the general union type generated 
* for ref documents (i.e. `mongoose.Types.ObjectId | UserDocument` -> `UserDocument`)
*/
type PopulatedProperty<Root, T extends keyof Root> = Omit<Root, T> & { 
  [ref in T]: Root[T] extends mongoose.Types.Array<infer U> ? 
    mongoose.Types.Array<Exclude<U, mongoose.Types.ObjectId>> :
    Exclude<Root[T], mongoose.Types.ObjectId> 
}

/**
 * Populate properties on a document type:
 * ```
 * import { PopulatedDocument } from "../interfaces/mongoose.gen.ts"
 *
 * function example(user: PopulatedDocument<UserDocument, "bestFriend">) {
 *   console.log(user.bestFriend._id) // typescript knows this is populated
 * }
 * ```
 */
export type PopulatedDocument<
DocType,
T
> = T extends keyof DocType
? PopulatedProperty<DocType, T> 
: (
    ParentProperty<T> extends keyof DocType
      ? Omit<DocType, ParentProperty<T>> &
      {
        [ref in ParentProperty<T>]: (
          DocType[ParentProperty<T>] extends mongoose.Types.Array<infer U> ? (
            mongoose.Types.Array<
              ChildProperty<T> extends keyof U 
                ? PopulatedProperty<U, ChildProperty<T>> 
                : PopulatedDocument<U, ChildProperty<T>>
            >
          ) : (
            ChildProperty<T> extends keyof DocType[ParentProperty<T>]
            ? PopulatedProperty<DocType[ParentProperty<T>], ChildProperty<T>>
            : PopulatedDocument<DocType[ParentProperty<T>], ChildProperty<T>>
          )
        )
      }
      : DocType
  )

/**
 * Helper types used by the populate overloads
 */
type Unarray<T> = T extends Array<infer U> ? U : T;
type Modify<T, R> = Omit<T, keyof R> & R;

/**
 * Augment mongoose with Query.populate overloads
 */
declare module "mongoose" {
  interface Query<ResultType, DocType, THelpers = {}> {
    populate<T extends string>(path: T, select?: string | any, model?: string | Model<any, THelpers>, match?: any): Query<
      ResultType extends Array<DocType> ? Array<PopulatedDocument<Unarray<ResultType>, T>> : (ResultType extends DocType ? PopulatedDocument<Unarray<ResultType>, T> : ResultType),
      DocType,
      THelpers
    > & THelpers;

    populate<T extends string>(options: Modify<PopulateOptions, { path: T }> | Array<PopulateOptions>): Query<
      ResultType extends Array<DocType> ? Array<PopulatedDocument<Unarray<ResultType>, T>> : (ResultType extends DocType ? PopulatedDocument<Unarray<ResultType>, T> : ResultType),
      DocType,
      THelpers
    > & THelpers;
  }
}



