import { Static, Type } from '@sinclair/typebox';

import { TaskGroup } from '../taskgroups/types';
import { User } from '../users/types';

const Task = Type.Object({
    id: Type.String(),
    taskType: Type.String(),
    title: Type.String(),
    isRequired: Type.Boolean(),
    isCompleted: Type.Boolean(),
    status: Type.String(),
    taskCategory: Type.String(),
    createdAt: Type.String(),
    updatedAt: Type.String(),
    completedAt: Type.String(),
    roleAllowed: Type.Array(Type.String()),
    roleDisallowed: Type.Array(Type.String()),
    departmentAllowed: Type.Array(Type.String()),
    departmentDisallowed: Type.Array(Type.String()),
    standardTime: Type.Number(),

    taskGroup: TaskGroup,
    users: Type.Array(User),
});

//  Default response
export const GetTaskRes = Type.Array(Task);
export type GetTaskRes = Static<typeof GetTaskRes>;

//  Create task
export const CreateTaskReq = Type.Object({
    ...Type.Partial(Task).properties,
    taskGroupId: Type.String(),
    parentIds: Type.Optional(Type.Array(Type.String())),
    childrenIds: Type.Optional(Type.Array(Type.String())),
});
export type CreateTaskReq = Static<typeof CreateTaskReq>;

// Search tasks
export const SearchTaskReq = Type.Pick(Task, ['id']);
export type SearchTaskReq = Static<typeof SearchTaskReq>;