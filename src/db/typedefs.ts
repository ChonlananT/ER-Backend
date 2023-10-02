export const typeDefs = `#graphql

enum Role {
  SUPER_ADMIN
  ADMIN
  USER
  }

enum Department {
  ER
  OR
  LAB
  ANY
}

enum TaskType {
  ADD_PATIENT_INFO
  ACTIVATE_TRACK
  CHECK_TIME
  END_PROCESS
}

enum Entry {
  WALKIN
  REFER
}

enum UserActType {
  CHECK_TIME
}

enum TaskStatus {
  PENDING
  SUCCESS
}

type TASK {
  id: ID! @unique """Not autogenerated, because we needs predefined values for the relationships"""
  taskType: TaskType @default(value: CHECK_TIME)
  title: String @default(value: "New Task")
  isRequired: Boolean @default(value: true)
  isCompleted: Boolean @default(value: false)
  status: TaskStatus @default(value: PENDING)
  taskCategory: String
  createdAt: DateTime! @timestamp(operations: [CREATE])
  updatedAt: DateTime @timestamp(operations: [UPDATE])
  completedAt: DateTime
  roleAllowed: [Role!]! @default(value: [])
  roleDisallowed: [Role!]! @default(value: [])
  departmentAllowed: [Department!]! @default(value: [])
  departmentDisallowed: [Department!]! @default(value: [])
  standardTime: Int 
  
  parents: [TASK!]! @relationship(type: "NEXT", direction: OUT)
  children: [TASK!]! @relationship(type: "NEXT", direction: IN)
  taskGroup: TASK_GROUP @relationship(type: "IN_TASKGROUP", direction: OUT)
  users: [USER!]! @relationship(type: "USER_ACT", properties: "USER_ACT_PROPS", direction: IN)

  eValue: Int
  vValue: String
  mValue: String
  bloodPressureH: Int
  bloodPressureL: Int
  pulse: Int
}

type TASK_GROUP {
  id: ID! @id
  entry: Entry
  destination: String
  createdAt: DateTime! @timestamp(operations: [CREATE])
  updatedAt: DateTime @timestamp(operations: [UPDATE])

  tasks: [TASK!]! @relationship(type: "TASK_IN", direction: IN)
  patient: PATIENT @relationship(type: "PATIENT_IN", direction: IN)
}

type USER {
  id: ID! @id
  title: String
  firstName: String
  lastName: String
  department: String
  username: String! @unique
  password: String!
  role: Role! @default(value: USER)
  createdAt: DateTime! @timestamp(operations: [CREATE])
  updatedAt: DateTime @timestamp(operations: [UPDATE])

  tasks: [TASK!]! @relationship(type: "USER_ACT", properties: "USER_ACT_PROPS", direction: OUT)
}

interface USER_ACT_PROPS @relationshipProperties {
     actType: UserActType @default(value: CHECK_TIME)
}

type PATIENT {
  id: ID! @id
  title: String
  firstName: String
  lastName: String
  hospitalNumber: String
  visitNumber: String
  admitNumber: String
  createdAt: DateTime! @timestamp(operations: [CREATE])
  updatedAt: DateTime @timestamp(operations: [UPDATE])

  taskGroups: [TASK_GROUP!]! @relationship(type: "PATIENT_IN", direction: OUT)
}
`;
