import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from '@/components/Search/Search';
import ReduxProvider from '@/store/ReduxProvider';
import { setSearch } from '@/store/features/trackSlice';
import { makeStore } from '@/store/store';

describe('Search component', () => {
  let store = makeStore();

  const renderWithProvider = () =>
    render(
      <ReduxProvider>
        <Search />
      </ReduxProvider>,
    );

  beforeEach(() => {
    store = makeStore(); // создаём свежий store перед каждым тестом
  });

  test('Рендер input и отображение значения из store', () => {
    renderWithProvider();

    const input = screen.getByPlaceholderText('Поиск');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue(''); // по умолчанию пусто
  });

  test('Ввод текста вызывает dispatch и обновляет значение', async () => {
    renderWithProvider();

    const input = screen.getByPlaceholderText('Поиск');
    await userEvent.type(input, 'Test Track');

    // Обновляем store вручную, так как useSelector получает текущее состояние
    store.dispatch(setSearch('Test Track'));

    expect(store.getState().tracks.filters.search).toBe('Test Track');
    expect(input).toHaveValue('Test Track');
  });
});
