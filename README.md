# Shoot Game Demo

Gemini Web UI Prompt로 생성한 게임 테스트입니다.

## 프롬프트

첨부는 슈팅 게임인데 마우스 클릭하면 해당 마우스 포인트로 발포가 되고 테이블 위 맥주잔, 날아다니는 접시 가끔 악당이 등장하는 게임이야. 
서부 술집 등 다양한 미국 서부 영화 배경들을 상대로 한 이런 유형의 스테이지가 10개 등장하는 Web Game을 만들고 싶고 
index.html, CSS, JS 등도 포함될 수 있게 하는 게임을 만들고 싶어. 이런 게임 만들고 source code를 파일 형태로 보여줘.

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
