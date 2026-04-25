/* ------------------------------------------------------------
🧹 rm -rf COMMAND EXPLANATION
--------------------------------------------------------------
# 🧱 Command:
#   rm -rf <path>

# 🔹 rm
#   → Stands for "remove". It deletes files or directories.

# 🔹 -r  (recursive)
#   → Deletes folders and their contents (including subfolders).
#   → Without this, `rm` can only delete individual files.

# 🔹 -f  (force)
#   → Forcefully deletes without asking for confirmation.
#   → Ignores any errors (like “file not found” or permission issues).

--------------------------------------------------------------
# 🧾 Example:
#   rm -rf testing
#     → Deletes the folder named "testing" and everything inside it.

#   rm -rf testing/*
#     → Deletes all files inside "testing" folder, but keeps the folder itself.

--------------------------------------------------------------
# ⚠️ WARNING:
#   Be extremely careful — this command permanently deletes data.
#   Example of a dangerous command:
#     ❌ rm -rf /
#     → Would delete the entire Linux filesystem.

--------------------------------------------------------------
# ✅ Tip:
#   • Run `ls` first to preview what will be deleted.
#   • Double-check your path before pressing Enter.
#   • Prefer running inside known directories to avoid accidents.

-------------------------------------------------------------- */

/*
  Command:
  mkdir -p dev-ops-docker

  This command creates a directory named "dev-ops-docker".

  The "-p" flag means:
  - Create the directory only if it does not already exist
  - Do NOT throw an error if the directory already exists
  - Create parent directories as needed

  If the directory "dev-ops-docker" already exists,
  the command will silently succeed without any error.

  This is commonly used in scripts and CI/CD pipelines
  to safely ensure a directory exists before using it.
*/











