import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReduxProvider from '@/store/ReduxProvider';
import Filter from '@/components/Filter/Filter';
import { data } from '@/data';
import { TrackType } from '@/sharedTypes/sharedTypes';

const mockTracks: TrackType[] = data;

describe('Filter component', () => {
  test('Отображение кнопок фильтров', () => {
    render(
      <ReduxProvider>
        <Filter
          title={['исполнителю', 'жанру', 'году выпуска']}
          tracks={mockTracks}
        />
      </ReduxProvider>,
    );

    expect(screen.getByText('исполнителю')).toBeInTheDocument();
    expect(screen.getByText('жанру')).toBeInTheDocument();
    expect(screen.getByText('году выпуска')).toBeInTheDocument();
  });

  test('Отображение списка авторов при клике на фильтр исполнителю', async () => {
    render(
      <ReduxProvider>
        <Filter
          title={['исполнителю', 'жанру', 'году выпуска']}
          tracks={mockTracks}
        />
      </ReduxProvider>,
    );

    const authorFilterButton = screen.getByText('исполнителю');
    await userEvent.click(authorFilterButton);

    // Проверяем, что первый автор из данных отображается
    expect(screen.getByText(mockTracks[0].author)).toBeInTheDocument();
  });

  test('Отображение жанров при клике на фильтр жанру', async () => {
    render(
      <ReduxProvider>
        <Filter
          title={['исполнителю', 'жанру', 'году выпуска']}
          tracks={mockTracks}
        />
      </ReduxProvider>,
    );

    const genreFilterButton = screen.getByText('жанру');
    await userEvent.click(genreFilterButton);

    expect(screen.getByText(mockTracks[0].genre[0])).toBeInTheDocument();
  });
});
