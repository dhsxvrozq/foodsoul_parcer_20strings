curl -s "https://djari.ru" | grep 'vike_pageContext' | sed 's/.*<script[^>]*>//' | sed 's/<\/script>.*//' | jq '.initialStoreState.products.all' > data.json
node parce.js