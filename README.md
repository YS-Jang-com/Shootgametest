# FORMA Studio — Landing Page Demo

Claude Code로 생성한 크리에이티브 스튜디오 랜딩 페이지입니다.

## 기능

- 커스텀 마우스 커서 (follower 효과)
- 로딩 애니메이션 (progress bar)
- 파티클 배경 (Canvas)
- 스크롤 트리거 reveal 애니메이션
- 카운터 애니메이션
- 마그네틱 버튼 효과
- 무한 마키 텍스트
- 모바일 반응형 (햄버거 메뉴 포함)
- 스크롤 감지 네비게이션

## 파일 구조

```
landing/
├── index.html   # 메인 페이지
├── style.css    # 스타일 + 애니메이션
├── main.js      # 인터랙션 스크립트
└── README.md
```

## GitHub Pages 배포 방법

```bash
# 1. 리포지토리 생성 (gh CLI 사용)
gh repo create forma-landing --public

# 2. 파일 업로드 및 푸시
git init
git add .
git commit -m "Initial commit: Forma landing page"
git branch -M main
git remote add origin https://github.com/<YOUR_USERNAME>/forma-landing.git
git push -u origin main

# 3. GitHub Pages 활성화
gh browse  # 브라우저에서 Settings > Pages > main branch 선택
```

또는 GitHub Pages 자동 활성화:
```bash
gh repo create forma-landing --public --source=. --push
# Settings > Pages > Deploy from branch > main > / (root) > Save
```

배포 후 주소: `https://<YOUR_USERNAME>.github.io/forma-landing/`

## Claude Code로 만든 방법

```
claude
> 크리에이티브 스튜디오 랜딩 페이지 만들어줘.
> 파티클 배경, 커스텀 커서, 스크롤 애니메이션, 모바일 반응형 포함.
> GitHub Pages에 바로 배포 가능하게 index.html, style.css, main.js 분리해서.
```
