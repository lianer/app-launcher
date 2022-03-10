import { Mutable } from 'type-fest';

type Person = {
  firstName: string;
  lastName: string;

  get fullName(): string;

  setFirstName(name: string): void;
  setLastName(name: string): void;
};

// 方法一：手动指定参数
// type P1 = { firstName: string; lastName: string; }
type P1 = Pick<Person, 'firstName' | 'lastName'>;

// 方法二：无效，根据 value 类型过滤，无法排除 string
type FilterValue<T extends any, K> = Pick<
  T,
  {
    [P in keyof T]: T[P] extends K ? P : never;
  }[keyof T]
>;
type P2 = FilterValue<Person, string>; // type P2 = { firstName: string; lastName: string; readonly fullName: string; }

// 方法三：根据函数匹配
type NonFunction<T> = Pick<
  T,
  {
    [K in keyof T]: T[K] extends Function ? never : K;
  }[keyof T]
>;
type P3 = NonFunction<Person>; // type P3 = { firstName: string; lastName: string; readonly fullName: string; }

// 方法四：对比去除 readonly 后与原属性是否相等
type PickWritable<T> = {
  [K in keyof T]: T[K] extends Readonly<T[K]> ? never : K;
};
type P4 = PickWritable<Person>; // type P4 = { firstName: string; lastName: string; fullName: string; }

// 方法五
type ExcludeReadonlyProps<T> = {
  [K in keyof T]: { readonly [P in K]: string } extends { [P in K]: string }
    ? never
    : K;
};

type P5 = ExcludeReadonlyProps<Person>;

type P6 = {
  [K in keyof Person]: { -readonly [P in K]: string } extends {
    [P in K]: string;
  }
    ? 1
    : 0;
};

// type IfEquals<X, Y> = (<T1>() => T1 extends X ? 1 : 2) extends <
//   T2
// >() => T2 extends Y ? 1 : 2
//   ? X
//   : never;

// type E1 = IfEquals<{ a: string }, { readonly a: string }>; // type E1 = never
// type E2 = IfEquals<{ a: string }, { a: string }>; // type E2 = { a: string; }

// 由于存在不确定的泛型 T，所以 T1、T2 在对比的时候 ts 无法进一步推导出 T 的类型，只能对 T1 和 T2 两个类型表达式进行对比，因此两者无法相等
type T1 = <T>() => T extends { a: string } ? 1 : 2;
type T2 = <T>() => T extends { readonly a: string } ? 1 : 2;
type T3 = T1 extends T2 ? 1 : 0; // 0

// 直接对类型表达性进行推断，两者是相等的
type E3 = { a: string } extends { readonly a: string } ? 1 : 0; // 1

type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X ? 1 : 2) extends <
  T
>() => T extends Y ? 1 : 2
  ? A
  : B;

type WritableKeys<T> = {
  [P in keyof T]: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, P>;
}[keyof T];

type R = WritableKeys<{
  name: string;
  get age(): number;
}>;

export {};
