# Validation

The following checks were completed for this package:

- All 16 complaint groups, all 65 curriculum entries, all 56 distinct Chinese pattern names, and all 195 fictional case IDs are present.
- Every symptom, tongue label and pulse label has Chinese, Pinyin, Thai and English text.
- All 195 cases were simulated through all seven interview steps and a correct final diagnosis.
- All 195 cases were also simulated with every wrong option selected before the correct option. Deductions, duplicate-click protection, stage locks and completion at zero points were checked.
- Hint deductions, diagnosis deductions, JSON session restoration, invalid session rejection and filtered five-case queues were checked.
- The software 3D renderer was tested for finite projected geometry, nonempty raster output, camera rotation, inspection views, patient changes, reduced motion and disposal.
- A full live-browser case was played with a wrong question and a wrong diagnosis. The score changed 100 → 92 → 77, the learner could retry, and the correct diagnosis opened the explanation and oral-answer template.
- Pinyin and Thai toggles were verified during that case: both were hidden when switched off, and could be restored.
- Study and comparison screens were opened in the browser. Progress showed the completed case and the saved best score.
- A 390-pixel iframe was used to inspect the narrow-screen layout. The game document had equal client width and scroll width (375 CSS pixels after its scrollbar), with no horizontal page overflow.
- The combined standalone HTML was opened in the browser and its application initialized successfully.
- JavaScript syntax checks passed. The Node test suite contains 9 test cases, including exhaustive loops over all 195 game cases.

The live QA browser did not expose WebGL. Visual QA therefore exercised the CPU 3D renderer. The WebGL route and behavior on physical iOS / Android devices were not directly tested. Device speech depends on the browser and installed Chinese voices.

These checks verify implementation and internal curriculum coverage; they are not independent clinical validation of the fictional cases.
