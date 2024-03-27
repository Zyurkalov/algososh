export const LOCALHOST: 'http://localhost:3000' = 'http://localhost:3000'

// setRoutesOption используется в тесте routes.cy.ts
// если создать свои объект настроек, тест автоматически применится к нему
export const setRoutesOption: {key: string, anchor: string | null, header: string}[] = [
    {
      key: "/recursion",
      anchor: null,
      header: 'Строка'
    },
    {
      key: "/fibonacci",
      anchor: null,
      header: 'Последовательность Фибоначчи'
    },
    {
      key: "/sorting",
      anchor: null,
      header: 'Сортировка массива'
    },
    {
      key: "/stack",
      anchor: null,
      header: 'Стек'
    },
    {
      key: "/queue",
      anchor: null,
      header: 'Очередь'
    },
    {
      key: "/list",
      anchor: null,
      header: 'Связный список'
    }
  ]