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
    expect(screen.getByText('The editorial method')).toBeInTheDocument();
    expect(screen.getByText('Less noise. More signal.')).toBeInTheDocument();
    expect(screen.getByText('Five ways to set the tone without changing the story.')).toBeInTheDocument();
    expect(screen.getAllByText('Free to use')).not.toHaveLength(0);
    expect(screen.getByText('No private resume storage')).toBeInTheDocument();
    expect(screen.getByText('Fully open source')).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /github/i })[0]).toHaveAttribute(
      'href',
      'https://github.com/ctudoudou/Prologue'
    );

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
    expect(screen.getByText('编辑方法')).toBeInTheDocument();
    expect(screen.getByText('减少噪音，放大信号。')).toBeInTheDocument();
    expect(screen.getAllByText('免费使用')).not.toHaveLength(0);
    expect(screen.getByText('不存储隐私简历')).toBeInTheDocument();
    expect(screen.getByText('完全开源')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '开始撰写' })).toBeInTheDocument();
  });
});
