// Czysta logika bez bazy i sieci — tu dopisuj kod testowany testami jednostkowymi (testy/unit/).
export function powitanie(imie?: string): string {
  const kto = imie?.trim();
  return kto ? `Cześć, ${kto}! To jest aleksander-test.` : 'Cześć! To jest aleksander-test.';
}

export function stanZdrowia(baza: 'ok' | 'blad' | 'brak'): { status: 'ok' | 'blad'; baza: string } {
  return { status: baza === 'blad' ? 'blad' : 'ok', baza };
}
