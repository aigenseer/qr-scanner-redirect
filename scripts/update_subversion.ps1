Xcopy "plugin" "C:\Users\aigenseer\Documents\svn\qr-scanner-redirect\trunk\" /K /D /H /Y
copy "readme.txt" "C:\Users\aigenseer\Documents\svn\qr-scanner-redirect\trunk\"
cd C:\Users\aigenseer\Documents\svn\qr-scanner-redirect
svn add --force trunk/*
svn commit -m "update"

