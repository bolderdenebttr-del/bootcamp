setVideo({
  shots: {
    a: { reg: 'paper', svg: (lt, R) => K.pop(lt, 0.3, K.fig(540, 1150, 2, T.blue), 540, 1150) + K.landing(540, 1150, lt, 0.6, T.blue),
         caps: [{ lead: [['Их сургуулиа', 0.2], ['төгсөөд', 0.6]], punch: [['диплом', 1.0, {accent:true}]], tail: [['авсан ч', 1.5]] }],
         src: 'Эх сурвалж: Үндэсний статистикийн хороо, 2024' },
    b: { reg: 'ink', svg: (lt, R) => K.fig(540, 1150, 2, R.fg) + K.text(540, 1500, 'ӨөҮү ₮ 2026', {fill: R.fg, size: 36, anchor:'middle'}),
         caps: [{ lead: [['Эдгээр', 3.1], ['чадвараа', 3.3], ['хөгжүүлэхийн', 3.6], ['тулд', 3.9], ['заавал', 4.1]], punch: [['шаардлагагүй.', 4.4]] }] },
    c: { reg: 'khadag', caps: [{ en: true, y: 780, lead: [['AI', 5.3], ['School', 5.4], ['of', 5.5], ['Mongolia', 5.6]], punch: [['шинэ', 5.9], ['элсэлтээ', 6.1]], tail: [['авч', 6.4], ['эхэллээ.', 6.6]], punchSize: 140 }] },
    end: LIB.endcard,
  },
  timeline: [{ shot: 'a', at: 0 }, { shot: 'b', at: 3 }, { shot: 'c', at: 5, ribbon: 0.6 }, { shot: 'end', at: 7.5 }],
  end: 10,
});
