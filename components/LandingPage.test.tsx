import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { LandingPage } from './LandingPage';

describe('LandingPage', () => {
  it('renders English copy and starts the builder', () => {
    const onStart = vi.fn();

    render(
      <LandingPage
        language="en"
        onLanguageChange={vi.fn()}
        onStart={onStart}
      />
    );

    expect(screen.getByRole('heading', { name: 'Prologue' })).toBeInTheDocument();
    expect(screen.getByText('Turn a career record into a first chapter worth reading.')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /start writing/i }));

    expect(onStart).toHaveBeenCalledTimes(1);
  });

  it('requests Chinese language when the language switch is clicked', () => {
    const onLanguageChange = vi.fn();

    render(
      <LandingPage
        language="en"
        onLanguageChange={onLanguageChange}
        onStart={vi.fn()}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: '中文' }));

    expect(onLanguageChange).toHaveBeenCalledWith('zh');
  });

  it('renders Chinese copy', () => {
    render(
      <LandingPage
        language="zh"
        onLanguageChange={vi.fn()}
        onStart={vi.fn()}
      />
    );

    expect(screen.getByText('把职业记录写成值得阅读的第一章。')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '开始撰写' })).toBeInTheDocument();
  });
});
