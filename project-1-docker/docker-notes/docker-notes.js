// 🐳 Docker Notes (Cheat Sheet)
// ============================================================

// ------------------------------------------------------------
// 🔹 Build Images
// ------------------------------------------------------------

// Build an image from Dockerfile in current directory
// docker build -t server-app .

// Build an image with a specific version tag
// docker build -t server-app:v50 .

// ------------------------------------------------------------
// 🔹 Run Containers
// ------------------------------------------------------------

// Run a container with a name, mapping same port
// docker run --name server-app-container-v50 -p 8000:8000 server-app:v50

// Run in detached (background) mode
// docker run -d --name server-app-container-v50 -p 8000:8000 server-app:v50

// Run with different host:container port mapping
// docker run -d --name server-app-container-v50 -p 8000:3215 server-app:v50
// Access in browser → http://localhost:8000 (host port)

// ------------------------------------------------------------
// 🔹 Manage Containers
// ------------------------------------------------------------

// List running containers
// docker ps

// List all containers (including stopped ones)
// docker ps -a

// Start an existing container
// docker start server-app-container-v50

// Stop a running container
// docker stop server-app-container-v50

// Remove a container
// docker rm server-app-container-v50

// View logs from a container
// docker logs server-app-container-v50

// ------------------------------------------------------------
// 🔹 Manage Images
// ------------------------------------------------------------

// List all Docker images
// docker images

// Remove an image
// docker rmi server-app:v50

// Pull an image manually
// docker pull node:20-alpine

// ------------------------------------------------------------
// 🔹 System Cleanup
// ------------------------------------------------------------

// Remove stopped containers, unused networks, dangling images, build cache
// docker system prune -f

// Remove unused images as well
// docker system prune -a -f

// Full cleanup including volumes (⚠️ deletes data)
// docker system prune -a --volumes -f
// Note:
//  - Does not delete running containers
//  - Deletes unused volumes and persistent data if not in use

// ============================================================
// 🔥 Docker Full Cleanup Commands (Containers + Images)
// ============================================================

// ------------------------------------------------------------
// 1️⃣ Delete All Containers (Running or Stopped)
// ------------------------------------------------------------

// Lists all container IDs: $(docker ps -aq)
// Force remove all containers (stops running ones first)
// docker rm -f $(docker ps -aq);

// ------------------------------------------------------------
// 2️⃣ Delete All Images (Used by Containers or Standalone)
// ------------------------------------------------------------

// Lists all image IDs: $(docker images -q)
// Force remove all images
// docker rmi -f $(docker images -q);

// ------------------------------------------------------------
// ✅ Recommended Safe Workflow
// ------------------------------------------------------------

// Stop & remove all containers, then delete all images
// Ensures no running containers block image removal
// docker rm -f $(docker ps -aq) && docker rmi -f $(docker images -q);

// ------------------------------------------------------------
// Optional Cleanup
// ------------------------------------------------------------

// Delete all Docker volumes (⚠️ deletes persistent data)
// docker volume rm $(docker volume ls -q);

// Delete all networks (except default ones)
// docker network rm $(docker network ls -q);

// ------------------------------------------------------------
// 1️⃣ Show Help for `docker ps` Command
// ------------------------------------------------------------

// Displays help information for the `docker ps` command
// Explains usage, syntax, and available options
// Example: docker ps --help

// Common Options You’ll See:
//   -a, --all      → Show all containers (running + stopped)
//   -q, --quiet    → Show only container IDs
//   -s, --size     → Display total file sizes of containers
//   --filter       → Filter containers based on conditions
//   --format       → Format output using a custom template

// 🔹 Tip:
// Use `docker ps` alone to list running containers,
// and `docker ps -a` to see all (including stopped ones).

// ------------------------------------------------------------
// 2️⃣ Run a New Container from an Image
// ------------------------------------------------------------

// Syntax:
// docker run [OPTIONS] IMAGE [COMMAND] [ARG...]

// 🧠 Meaning:
// Creates and starts a new container from the specified image.
// You can also run a custom command inside that container.

// ------------------------------------------------------------
// 🔹 Common Options:
// ------------------------------------------------------------
// -d                  → Run container in detached (background) mode
// -it                 → Run interactively with a terminal
// -p HOST:CONTAINER   → Map host port to container port
// --name NAME         → Assign a custom name to the container
// -e KEY=VALUE        → Set environment variables
// -v HOST:CONTAINER   → Mount a volume (host directory inside container)

// ------------------------------------------------------------
// 🔹 Examples:
// ------------------------------------------------------------
// Run Ubuntu image and open shell
// docker run -it ubuntu /bin/bash

// Run Nginx in background with port mapping
// docker run -d -p 8080:80 --name webserver nginx

// Run a single command in a temporary container
// docker run ubuntu echo "Hello Docker"

// ------------------------------------------------------------
// 🧾 Summary:
// docker run = create + start a container from an image
// Optionally, run commands inside and customize with flags.
// ------------------------------------------------------------

// ------------------------------------------------------------
// 3️⃣ Inspect Detailed Information of a Docker Image
// ------------------------------------------------------------

// Syntax:
// docker image inspect <IMAGE_ID_or_DIGEST>

// Example:
// docker image inspect sha256:66460d557b25769b102175144d538d88219c077c678a49af4afca6fbfc1b5252

// 🧠 Meaning:
// Displays complete metadata of a specific Docker image in JSON format.
// Includes details like ID, OS type, size, creation time, layers, and configs.

// ------------------------------------------------------------
// 🔹 Common Fields in Output:
// ------------------------------------------------------------
// "Id"              → Unique identifier (SHA256 digest) of the image
// "RepoTags"        → Name and tag of the image (e.g., "ubuntu:latest")
// "Created"         → Date and time when image was built
// "DockerVersion"   → Version of Docker used to build the image
// "Os"              → Operating system the image is built for (usually "linux")
// "Architecture"    → CPU type (e.g., amd64, arm64)
// "Size"            → Total size of the image
// "Config.Env"      → Environment variables set inside the image
// "Config.Cmd"      → Default command executed when container starts
// "RootFS.Layers"   → List of file system layers making up the image

// ------------------------------------------------------------
// 🔹 Example Usage:
// ------------------------------------------------------------
// View all details of an image:
// docker image inspect nginx

// Filter and show only specific field using --format:
// docker image inspect nginx --format '{{.Size}}'
// docker image inspect nginx --format '{{.Os}}'

// ------------------------------------------------------------
// 🧾 Summary:
// docker image inspect = Show full, detailed info about an image.
// Useful for debugging, verifying build data, or checking layers.
// ------------------------------------------------------------

// ------------------------------------------------------------
// 4️⃣ Remove Containers and Images in Docker
// ------------------------------------------------------------

// 🧱 1. Remove a Container
// ------------------------------------------------------------
// Syntax:
// docker container rm <CONTAINER_ID_or_NAME>

// 🧠 Meaning:
// Deletes (removes) a container from the system.
// Works only for stopped containers (use -f to force remove a running one).

// Examples:
// docker container rm 4a1b2c3d4e5f       → Remove a specific container
// docker container rm -f 4a1b2c3d4e5f    → Force remove (even if running)
// docker container rm $(docker ps -aq)   → Remove ALL containers

// ------------------------------------------------------------
// 2. Remove an Image
// ------------------------------------------------------------
// Syntax:
// docker image rm <IMAGE_ID_or_NAME>

// 🧠 Meaning:
// Deletes a Docker image from local storage.
// You cannot remove an image if it’s still used by a container.

// Examples:
// docker image rm ubuntu:latest           → Remove image by name
// docker image rm sha256:abcd1234efgh     → Remove image by ID
// docker rmi -f $(docker images -q)       → Force remove ALL images

// ------------------------------------------------------------
// 🔹 Notes:
// ------------------------------------------------------------
// - "rm" = remove
// - Use "-f" (force) carefully — it deletes without confirmation
// - Remove containers first, then images (images can’t be deleted if containers use them)

// ------------------------------------------------------------
// 🧾 Summary:
// docker container rm → Remove one or more containers
// docker image rm     → Remove one or more images
// Used for cleaning up unused or old Docker resources.
// ------------------------------------------------------------

// ------------------------------------------------------------
// 🧹 Docker Image Cleanup Commands
// ------------------------------------------------------------

// 1️⃣ Remove ONLY Dangling Images
// ------------------------------------------------------------
// 🔹 Command:
// docker image prune
//
// 🔸 Meaning:
// Removes only "dangling" images — old, leftover images with no name (<none>)
// and not linked to any running or stopped container.
//
// 🔸 Example of a dangling image:
// <none>   <none>   66460d557b25
//
// 🔸 Safe to use:
// ✅ Yes — only deletes useless images that take up space.
//
// 🔸 Use when:
// You want to clean junk images but keep others for reuse.

// 2️⃣ Remove ALL Unused Images (Full Cleanup)
// ------------------------------------------------------------
// 🔹 Command:
// docker image prune -a
//
// 🔸 Meaning:
// Removes ALL images that are NOT used by any container —
// even if they have a proper name or tag (like ubuntu:latest).
//
// 🔸 Safe to use:
// ⚠️ Be careful — this will delete even tagged images if not used.
// Docker will need to re-download them later.
//
// 🔸 Use when:
// You want to free maximum disk space and don’t mind re-pulling images.

// ------------------------------------------------------------
// 🧾 Quick Summary
// ------------------------------------------------------------
// docker image prune     → Removes only dangling (unnamed) images ✅ Safe
// docker image prune -a  → Removes ALL unused images ⚠️ Aggressive cleanup

// ------------------------------------------------------------
// 🐳 Run an Interactive Ubuntu Container
// ------------------------------------------------------------

// 🔹 Create and start a new container using the "ubuntu" image
// 🔹 Open it in interactive terminal mode (-it)
// 🔹 Assign a custom name "my-container"

// Command:
// docker run -it --name my-container ubuntu

// 💡 Breakdown:
// - docker run            → Create & start a new container
// - -i                    → Keep STDIN open (interactive)
// - -t                    → Allocate terminal (TTY)
// - --name my-container   → Set container name manually
// - ubuntu                → Image to use (from Docker Hub or local)

// 🧾 Result:
// Launches a live Ubuntu shell inside Docker.
// Type "exit" to leave — the container stops but is not deleted.

// ------------------------------------------------------------
// 💣 Force Stop (Kill) a Running Container
// ------------------------------------------------------------

//Kill mean shut down your computer but still you have that

// 🔹 Immediately kills a running container using its ID or name
// 🔹 Sends SIGKILL signal — no graceful shutdown
// 🔹 Use only when "docker stop" doesn’t work or hangs

// Command:
// docker kill 075061942b25

// 💡 Breakdown:
// - docker kill          → Forcefully stop container
// - 075061942b25         → Container ID (or use name)

// ⚠️ Note:
// Container will stop instantly but remain on the system.
// To remove it completely:
// docker rm 075061942b25

// ✅ Use only when you need to forcefully stop a stuck container

// ------------------------------------------------------------
// 💣 docker kill → Forcefully Stop a Running Container
// ------------------------------------------------------------

// 🔹 Instantly shuts down (kills) a running container
// 🔹 Sends SIGKILL signal — no graceful shutdown
// 🔹 The container stops immediately but is NOT deleted
// 🔹 Similar to holding the power button on a computer:
//    → Computer turns off instantly, but it still exists

// Command:
// docker kill <container-id>

// 🧾 Example:
// docker kill 075061942b25

// ✅ Container state after kill:
// - It stops running
// - You can restart it again:
//   docker start <container-id>
// - Or remove it completely:
//   docker rm <container-id>

// ⚠️ Use when:
// "docker stop" doesn’t respond or container is stuck

// ------------------------------------------------------------
// 🏗️ docker build → Build a Docker Image from a Dockerfile
// ------------------------------------------------------------

// 🔹 Creates a Docker image using instructions in a Dockerfile
// 🔹 Packages your app code, dependencies, and environment into one image
// 🔹 The image can later be used to run containers anywhere

// Command:
// docker build -t <image-name> <path>

// 🧾 Example:
// docker build -t my-app .

// ✅ What this does:
// - Looks for a Dockerfile in the current directory (".")
// - Executes each Dockerfile instruction step-by-step (FROM, RUN, COPY, etc.)
// - Builds a new image from those steps
// - Tags the image name as "my-app" for easy identification

// 📦 After Build:
// - Run the image as a container: docker run my-app
// - List all built images: docker images

// ⚠️ Use when:
// You’ve created or modified a Dockerfile and want to generate a new image

// ------------------------------------------------------------
// 🌐 docker run -p / --publish → Map Container Ports to Host
// ------------------------------------------------------------

// 🔹 Used to expose container ports to your local machine
// 🔹 Allows access to apps running inside Docker (e.g., web servers)
// 🔹 Maps HOST_PORT:CONTAINER_PORT → your computer ↔ container

// Command:
// docker run -p <host-port>:<container-port> <image-name>

// 🧾 Example:
//  docker run -p 18000:8000 my-app:9

// ✅ What happens:
// - The container runs from image "my-app:9"
// - Inside the container, the app listens on port 8000
// - On your computer, you can access it via port 18000 (http://localhost:18000)

// ------------------------------------------------------------
// 🧩 Short vs Long Flag
// ------------------------------------------------------------
// -p           → Short flag for port mapping
// --publish    → Long form of the same flag
// ❌ -port     → Invalid syntax (not recognized by Docker)

// 🧱 Examples:
// docker run -p 18000:8000 my-app:9
// docker run --publish 18000:8000 my-app:9

// 💡 In short:
// "Expose your container’s internal port (8000) through your host machine’s port (18000)"

// ------------------------------------------------------------
// 🛑 STOP a running container
// ------------------------------------------------------------

// Syntax:
// docker stop <container-id or container-name>

// Example:
// docker stop my-container
// → Gracefully stops the running container named "my-container"

// Note:
// After stopping, the container still exists in stopped state
// (use 'docker ps -a' to view it)

// ------------------------------------------------------------
// ▶️ START a stopped container
// ------------------------------------------------------------

// Syntax:
// docker start <container-id or container-name>

// Example:
// docker start my-container
// → Starts the previously stopped container (in background mode)

// ------------------------------------------------------------
// 🧠 If you want to ATTACH (see logs or interact):
// ------------------------------------------------------------

// Syntax:
// docker start -ai <container-id or container-name>

// Example:
// docker start -ai my-container
// → Starts container in interactive mode (attach to console)

// ------------------------------------------------------------
// 📜 View all containers (running + stopped):
// ------------------------------------------------------------
// docker ps -a
// → Shows container IDs, names, status, and ports

// ------------------------------------------------------------
// ⚙️ docker run -it  vs  docker start -ai
// ------------------------------------------------------------

// 🧩 docker run -it
// ------------------------------------------------------------
// 🔹 Creates & runs a NEW container interactively
// 🔹 Commonly used for launching a fresh container with a shell
// 🔹 Flags:
//     -i → Keeps STDIN open (interactive input)
//     -t → Allocates a pseudo-TTY (terminal interface)
// 🔹 Example:
//     docker run -it ubuntu bash
// 🔹 You start from scratch (a brand-new container)

// 🧩 docker start -ai containername or id
// ------------------------------------------------------------
// 🔹 Starts an EXISTING stopped container interactively
// 🔹 Used when you want to reattach to a container that was stopped
// 🔹 Flags:
//     -a → Attach to container’s STDOUT/STDERR
//     -i → Keep STDIN open for interaction
// 🔹 Example:
//     docker start -ai beautiful_neumann
// 🔹 You continue where you left off (an old container)

// ✅ Summary:
// ------------------------------------------------------------
// docker run -it  → Start a NEW container interactively
// docker start -ai → Resume a STOPPED container interactively

// ------------------------------------------------------------
// 🚀 docker run -it -P my-app:v11 → Run Container with Auto Port Mapping
// ------------------------------------------------------------

// 🔹 Creates and starts a new container from the image "my-app:v11"
// 🔹 The app runs in interactive mode with a terminal attached
//    -i → keeps input open (interactive mode)
//    -t → allocates a terminal (so you can type commands)

// ------------------------------------------------------------
// 🌐 -P → Auto-Publish Exposed Ports
// ------------------------------------------------------------
// 🔸 Automatically maps all ports that were EXPOSED in the Dockerfile
// 🔸 Docker randomly picks available ports on your computer
//    and connects them to your container’s internal ports
//
// Example of automatic mapping:
//    0.0.0.0:32768 -> 8000/tcp
//    → Means: container port 8000 is accessible on your PC at port 32768
//
// 🧭 You can check which port was assigned using:
//    docker ps
//
// ------------------------------------------------------------
// 🧩 Summary:
// - Creates and runs a container from image "my-app:v11"
// - Interactive terminal access
// - All exposed container ports get automatically connected
// - Your app becomes accessible on a random host port (e.g., 32768)
//
// 🧾 Example Access:
//   http://localhost:32768
//
// ------------------------------------------------------------
// docker run -it -P my-app:v11

// ✅ Command:
// docker ps

// ------------------------------------------------------------
// 📋 docker ps → List Running Containers
// ------------------------------------------------------------
//
// 🔹 Shows all containers that are currently RUNNING
// 🔹 Helps you monitor container status, ports, and images in use
//
// ------------------------------------------------------------
// 🧾 Output Columns Explained:
// ------------------------------------------------------------
// CONTAINER ID → Short unique ID for the container
// IMAGE        → The Docker image used to create the container
// COMMAND      → The process or command running inside the container
// CREATED      → When the container was started
// STATUS       → Shows if it’s Up (running), Exited (stopped), or Paused
// PORTS        → Displays port mappings (e.g. 0.0.0.0:32768->8000/tcp)
// NAMES        → The container’s name (auto-generated if not provided)
//
// ------------------------------------------------------------
// 🧰 Common Variations:
// ------------------------------------------------------------
// docker ps                       → Show only running containers (default)
// docker ps -a                    → Show ALL containers (running + stopped)
// docker ps -q                    → Show only container IDs
// docker ps --filter "status=exited" → Filter by status or name
//
// ------------------------------------------------------------
// 🧭 Real-Life Analogy:
// ------------------------------------------------------------
// Think of this as Docker’s “Task Manager”
// → It shows which containers are currently active and on which ports.
//
// ------------------------------------------------------------
// 🧩 Example Output:
// ------------------------------------------------------------
// CONTAINER ID   IMAGE         STATUS         PORTS                     NAMES
// a1b2c3d4e5f6   my-app:v11    Up 2 minutes   0.0.0.0:32768->8000/tcp   amazing_kalam

// ✅ Command:
// docker run -it -P --name my-app-11 my-app:v11

// ------------------------------------------------------------
// 🐳 docker run → Create and Start a New Container
// ------------------------------------------------------------
//
// 🔹 This command runs a new container from the specified image
// 🔹 It combines multiple useful flags to control container behavior
//
// ------------------------------------------------------------
// ⚙️ Flag Breakdown:
// ------------------------------------------------------------
// -it          → Runs the container in INTERACTIVE mode with a terminal
//                 (lets you type commands inside the container if needed)
//
// -P           → Automatically maps all EXPOSED ports in the Dockerfile
//                 to random available ports on the host machine
//                 e.g., 0.0.0.0:32768 → 8000/tcp
//
// --name       → Assigns a CUSTOM NAME to the container
//                 (instead of a random auto-generated one)
//                 e.g., "my-app-11"
//
// my-app:v11   → The image name and version (tag) to run
//
// ------------------------------------------------------------
// 🧭 Real-Life Analogy:
// ------------------------------------------------------------
// Think of this as starting a virtual mini-computer (container) from a saved setup (image)
// and giving it a name for easy identification later.
//
// ------------------------------------------------------------
// 🧩 Example Behavior:
// ------------------------------------------------------------
// 1️⃣ Starts a new container using image "my-app:v11"
// 2️⃣ Assigns it the name "my-app-11"
// 3️⃣ Exposes app port(s) (like 8000) to a random host port
// 4️⃣ Opens an interactive terminal session for real-time logs or commands
//
// ------------------------------------------------------------
// ✅ Example Output (from `docker ps`):
// ------------------------------------------------------------
// CONTAINER ID   IMAGE         STATUS         PORTS                     NAMES
// a1b2c3d4e5f6   my-app:v11    Up 3 minutes   0.0.0.0:32769->8000/tcp   my-app-11

// ------------------------------------------------------------
// 🚀 docker run -it --rm --name my-app-v14 my-app:v14
// ------------------------------------------------------------
//
// 🧩 Purpose:
// Runs a new container from the image "my-app:v14"
// with interactive mode, auto-cleanup, and a custom name.
//
// ------------------------------------------------------------
// ⚙️ Flags Explained:
// ------------------------------------------------------------
//
// -it
// → Runs container in Interactive + Terminal mode
// → Lets you type commands directly inside the container
//
// --rm
// → Automatically removes the container once it stops
// → Keeps your system clean (no stopped containers left behind)
//
// --name my-app-v14
// → Assigns a custom name to the container ("my-app-v14")
// → Makes it easier to identify or manage later
//
// my-app:v14
// → The Docker image name ("my-app") and its version tag ("v14")
// → This image must exist locally or be pulled from a registry
//
// ------------------------------------------------------------
// 🧭 Real-Life Analogy:
// ------------------------------------------------------------
// Think of this as starting a temporary virtual computer:
// → It runs interactively
// → You can use it freely
// → And once you exit, it deletes itself automatically
//
// ------------------------------------------------------------
// ✅ Example Usage:
// ------------------------------------------------------------
// docker run -it --rm --name express-server my-app:v14
//
// ------------------------------------------------------------
// 💡 Tip:
// ------------------------------------------------------------
// If you want to keep the container after exit, remove `--rm`
//
// Command:
// docker run -it --rm --name my-app-v14 my-app:v14

// ------------------------------------------------------------
// ⚙️ Docker Run Modes: -itd vs -it vs -d
// ------------------------------------------------------------
//
// 🧩 Purpose:
// These flags control how your container runs — interactively or in the background.
//
// ------------------------------------------------------------
// 🔹 -it  → Interactive Mode
// ------------------------------------------------------------
// -i → Keeps STDIN open (so you can type commands)
// -t → Allocates a pseudo-terminal (TTY) for interaction
// ✅ Use when you want to run and interact directly inside the container
// Example:
//     docker run -it my-app:v14
// 👉 You’ll be "inside" the container shell until you exit manually.
//
// ------------------------------------------------------------
// 🔹 -d  → Detached Mode
// ------------------------------------------------------------
// -d → Runs the container in the background (no terminal attached)
// ✅ Use when you want the container to run silently without blocking your terminal
// Example:
//     docker run -d my-app:v14
// 👉 Container runs in background — you can continue using your terminal.
//
// ------------------------------------------------------------
// 🔹 -itd  → Interactive + Detached Mode
// ------------------------------------------------------------
// Combination of interactive (-it) and detached (-d) flags
// ✅ Useful if you might want to attach later or send input while keeping it backgrounded
// Example:
//     docker run -itd my-app:v14
// 👉 Starts container in background, but keeps TTY open so you can attach later using:
//     docker exec -it <container_name> /bin/sh
//
// ------------------------------------------------------------
// 🧠 Summary:
// ------------------------------------------------------------
// Mode   | Runs in Background | Interactive Terminal | Typical Use
// -------|--------------------|----------------------|-------------
// -it    | ❌ No              | ✅ Yes               | Manual testing / debugging
// -d     | ✅ Yes             | ❌ No                | Background services
// -itd   | ✅ Yes             | ✅ Yes (reattachable) | Long-running interactive containers

/* ------------------------------------------------------------
🚀 docker run -itd -P --rm --name my-app-v14 my-app:v14
------------------------------------------------------------
🧩 Purpose:
Runs a container from the image "my-app:v14" in the background (detached mode),
with automatic port mapping, auto-cleanup, and a custom container name.

------------------------------------------------------------
⚙️ Flags Explained:
------------------------------------------------------------
-it   → Interactive terminal mode (keeps STDIN open + allocates a TTY)
-d    → Detached mode (runs container in the background)
-P    → Publishes all exposed ports to random host ports
--rm  → Automatically removes the container after it stops
--name my-app-v14 → Assigns a custom name to the container
my-app:v14 → The image name and tag used to create the container

💡 Example:
This starts your container in the background and keeps your terminal free
for other commands.
------------------------------------------------------------
*/

/* ------------------------------------------------------------
🚀 docker exec -it 81dc48f2e178a9cc45f8a5ce03d6ba1517273e93958a7bd372ae65bb0bec866e sh
------------------------------------------------------------
🧩 Purpose:
Executes a new shell session (`sh`) inside a running container.
Useful for debugging, checking logs, inspecting files, or running manual commands.

------------------------------------------------------------
⚙️ Flags Explained:
------------------------------------------------------------
exec  → Runs a new command inside an already running container
-it   → Opens an interactive terminal session
sh    → Starts the shell process inside the container

💡 Example:
You can enter into the container environment directly and execute commands.
After finishing, type `exit` to leave the shell.
Typing `exit` will free your terminal without stopping the container.
------------------------------------------------------------
*/

/* ------------------------------------------------------------
🚀 docker tag + docker push → Upload Image to Docker Hub
------------------------------------------------------------

🧩 Purpose:
These two commands work together to publish a **local Docker image**
to your **Docker Hub repository** (your online Docker account).

------------------------------------------------------------
⚙️ Step 1: Tag the Local Image
------------------------------------------------------------
docker tag my-app rinkesh375/rinkesh-first-repo

🔹 "my-app" → Local image name (already built on your system)
🔹 "rinkesh375/rinkesh-first-repo" → Repository name on Docker Hub

🧠 Meaning:
This command creates a *new tag (label)* for your local image.
It does **NOT duplicate** or copy the image — it simply gives your
local image a new "remote name" so Docker knows where to push it later.

📍 Example:
Before tagging:
  my-app:latest (local only)

After tagging:
  my-app:latest (local)
  rinkesh375/rinkesh-first-repo:latest (local, linked to Docker Hub)

------------------------------------------------------------
⚙️ Step 2: Push the Tagged Image to Docker Hub
------------------------------------------------------------
docker push rinkesh375/rinkesh-first-repo

🔹 Uploads your *tagged local image* to your Docker Hub account.
🔹 "rinkesh375" → Your Docker Hub username
🔹 "rinkesh-first-repo" → Repository name under your account

🧠 Meaning:
Now the image is copied from your **local system** to your
**Docker Hub cloud repository**, making it available publicly (or privately).

------------------------------------------------------------
🌐 Summary:
------------------------------------------------------------
Local Image (on your PC):
  🏠 my-app:latest
  🏠 rinkesh375/rinkesh-first-repo:latest

Remote Repository (on Docker Hub):
  🌎 docker.io/rinkesh375/rinkesh-first-repo:latest

✅ After push:
- You can pull it from anywhere using:
    docker pull rinkesh375/rinkesh-first-repo

- Your image now lives both locally and remotely on Docker Hub.
------------------------------------------------------------ */

/*

############################################################
# 🧱 DOCKER BUILD COMMAND EXPLANATION
#
# Command:
#   docker build -t ts-app-old -f Dockerfile.old .
#
# 🔹 docker build
#   → Tells Docker to build a new image using the instructions
#     written inside a Dockerfile.
#
# 🔹 -t ts-app-old
#   → The '-t' flag is used to assign a name (tag) to the image.
#     In this case, the image will be saved as 'ts-app-old'.
#     Example: You can run it later using `docker run ts-app-old`
#
# 🔹 -f Dockerfile.old
#   → By default, Docker looks for a file named 'Dockerfile'.
#     This flag tells Docker to use a custom Dockerfile
#     called 'Dockerfile.old' instead.
#
# 🔹 .
#   → The dot at the end represents the current directory.
#     It acts as the "build context" — meaning Docker will
#     include all files in this folder so they can be copied
#     into the image during the build process.
#
# Example Summary:
#   This command builds a Docker image using 'Dockerfile.old',
#   includes the files from the current directory,
#   and tags (names) the final image as 'ts-app-old'.
############################################################


*/

/*
# ------------------------------------------------------------
# 🧩 docker exec -it container-id env
# ------------------------------------------------------------
# → This command runs a one-time process inside an already running container.
# 
# 🧠 Breakdown:
#   • docker exec     → Used to execute a command inside a running container.
#   • -i              → Keeps STDIN open (interactive mode).
#   • -t              → Allocates a pseudo-terminal (so output looks normal).
#   • 7e72de1dfe5b... → The container’s ID (can also use its name instead).
#   • env             → The command to run inside the container — it lists
#                       all environment variables currently active inside it.
#
# 🧾 In simple words:
#   This shows you all environment variables (like PORT, PATH, NODE_ENV, etc.)
#   that exist inside the running container.
#
# 🧩 Example:
#   You might see output like:
#     PATH=/usr/local/bin:/usr/bin:/bin
#     NODE_VERSION=20.17.0
#     PORT=3000
#
# ✅ Tip:
#   You can also use `docker exec -it <container_id> sh` to enter the container
#   and manually run commands like `echo $PORT` or `printenv`.
# ------------------------------------------------------------

*/

/* ------------------------------------------------------------
🧩 docker run -it -P -e PORT=3000 --rm --name node-ts-app node-ts-app
---------------------------------------------------------------
🧠 Breakdown of this command:

• docker run  
  → Used to start (run) a new container from an image.

• -i  
  → Keeps STDIN open (so you can interact with the container).

• -t  
  → Allocates a terminal interface — helps you see logs and interact better.

• -P  
  → Publishes all exposed ports in the Dockerfile to random ports on your computer.
    Example: If your app exposes 3000, Docker might map it to 49160 on your PC.

• -e PORT=3000  
  → Sets an environment variable inside the container (here, PORT=3000).
    This overrides the value of ENV PORT set in the Dockerfile.

• --rm  
  → Automatically removes the container once it stops.
    (Useful for testing so it doesn’t leave unused containers behind.)

• --name node-ts-app  
  → Gives a readable name to the container instead of a random one.

• node-ts-app  
  → The name of the image from which the container is created and run.

🧾 In simple words:
  This command starts a new container named “node-ts-app” from the image “node-ts-app”,
  sets PORT=3000 inside it, maps its ports to your computer automatically, and removes
  the container after it stops.

✅ Example analogy:
  It’s like starting a virtual mini-computer (container) from your saved machine image
  (Docker image), naming it “node-ts-app”, setting a custom configuration (PORT=3000),
  and telling it to self-delete when it shuts down.
------------------------------------------------------------ */

/* ------------------------------------------------------------
 🧩 docker run -it -P -e PORT=3000 --rm --name node-ts-app node-ts-app

 📘 Explanation:
 - "docker run" → Starts a new Docker container
 - "-it" → Runs in interactive + terminal mode (you can view logs and interact)
 - "-P" → Automatically maps all EXPOSEd ports from the Dockerfile to random ports on your host machine
 - "-e PORT=3000" → Passes an environment variable directly to the container (PORT=3000)
 - "--rm" → Automatically removes the container when it stops (keeps things clean)
 - "--name node-ts-app" → Assigns a friendly name to this container
 - "node-ts-app" → The image name from which the container will be created

 💡 Example Use Case:
 Use this command when you want to quickly run your Node.js app in a clean container,
 with a specific PORT variable and automatic port mapping enabled.
------------------------------------------------------------ */

/* 
############################################################
# 🌐 DOCKER NETWORK LIST COMMAND EXPLANATION
#
# Command:
#   docker network ls
#
# 🔹 Purpose:
#   Lists all the Docker networks available on your system.
#   These networks define how containers communicate with each
#   other and with the outside world.
#
# 🔹 Columns Explained:
#   • NETWORK ID → Unique identifier for each Docker network.
#   • NAME       → The name of the network (e.g., bridge, host, none).
#   • DRIVER     → Defines how the network operates (bridge, host, null).
#   • SCOPE      → Indicates where the network exists ('local' means
#                   only on this Docker host).
#
# 🔹 Default Networks:
#   • bridge → Default network; containers can talk to each other 
#               using container names.
#   • host   → Shares the host's network stack; no isolation.
#   • none   → No network connectivity; fully isolated container.
#
# 🔹 Example Output:
#   NETWORK ID     NAME      DRIVER    SCOPE
#   91a9d516e6f4   bridge    bridge    local
#   e85bd9f99dc8   host      host      local
#   08a1cc940ca3   none      null      local
#
# 🧾 Summary:
#   The `docker network ls` command helps you view and manage
#   Docker's virtual networks that control container connectivity.
############################################################
*/

/* ------------------------------------------------------------
🌐 docker network inspect bridge
---------------------------------------------------------------
🔹 PURPOSE:
This command shows **all details** of Docker’s default network called `bridge`.
It helps you see how containers are connected and what IPs and settings Docker assigned.

---------------------------------------------------------------
📊 WHAT THIS OUTPUT MEANS:
{
  "Name": "bridge",                     # Name of the network (default = bridge)
  "Id": "91a9d516e6f4...",              # Unique ID for this network
  "Created": "2025-11-02T03:54:22...",  # When this bridge network was created
  "Scope": "local",                     # Network is only on this Docker host
  "Driver": "bridge",                   # Type of network (bridge = connects containers on same host)
  "EnableIPv4": true,                   # IPv4 networking is ON
  "EnableIPv6": false,                  # IPv6 is OFF (default)

---------------------------------------------------------------
🧭 IPAM (IP Address Management)
"IPAM": {
   "Driver": "default",                 # Uses Docker’s default IPAM driver
   "Config": [
      {
        "Subnet": "172.17.0.0/16",     # Range of IPs for containers
        "Gateway": "172.17.0.1"        # Default gateway (router for containers)
      }
   ]
}

---------------------------------------------------------------
📦 Containers Connected:
"Containers": {
   "7fed49e79369...": {
      "Name": "my-container2",          # Container name
      "IPv4Address": "172.17.0.3/16",   # IP assigned to this container
      "MacAddress": "02:42:1f:5d:07:36" # Its MAC address
   },
   "d0b99b6ff511...": {
      "Name": "busybox-container",      # Another container connected
      "IPv4Address": "172.17.0.2/16",   # IP assigned to it
      "MacAddress": "7a:4a:01:67:e3:cb" # Its MAC address
   }
}

👉 Both containers share the same network (bridge) so they can talk to each other 
   using their IPs or container names.

---------------------------------------------------------------
⚙️ Options:
"Options": {
   "com.docker.network.bridge.default_bridge": "true",   # Marks this as the default bridge
   "com.docker.network.bridge.enable_icc": "true",       # Containers can communicate with each other
   "com.docker.network.bridge.enable_ip_masquerade": "true", # Allows containers to access the internet
   "com.docker.network.bridge.host_binding_ipv4": "0.0.0.0", # Binds all interfaces on host
   "com.docker.network.bridge.name": "docker0",          # Host interface name
   "com.docker.network.driver.mtu": "1500"               # Max packet size
}

---------------------------------------------------------------
🧠 SIMPLE SUMMARY:
✅ You ran → `docker network inspect bridge`
✅ It shows:
   - Network name and type (bridge)
   - IP range & gateway used
   - All containers connected to it with their IPs
   - Internal bridge interface on host (`docker0`)
   - Options controlling communication and internet access

---------------------------------------------------------------
💡 WHY USE THIS:
Use it to troubleshoot container connectivity,
check IP addresses, or confirm which containers share the same network.
--------------------------------------------------------------- */

/* ------------------------------------------------------------
🐳 docker exec busybox-container ping 172.17.0.3
---------------------------------------------------------------
# 🧠 Purpose:
# Runs a command inside an already running Docker container 
# to test network connectivity between containers.

# 🔍 Explanation of each part:
# - docker exec → Executes a command inside a running container.
# - busybox-container → The name (or ID) of the container where the command will run.
# - ping 172.17.0.3 → Sends ICMP packets to another container or host at IP 172.17.0.3
#                     to check if it is reachable over the Docker network.

# 🌐 Use Case:
# This command is commonly used to verify that two containers can communicate 
# within the same Docker network. For example, if one container runs an app 
# and another runs a database, you can test their connection using ping.

# ✅ Example Outcome:
# - Successful ping → Confirms that network connectivity is working between containers.
# - Failed ping → Indicates network isolation or misconfiguration.

# 🧱 Example Scenario:
# Suppose you have two containers:
#   1️⃣ app-container (IP: 172.17.0.2)
#   2️⃣ db-container (IP: 172.17.0.3)
# You can run this command from app-container to test if it can reach db-container.
------------------------------------------------------------ */

/* ------------------------------------------------------------
🌌 docker network create milkyway
---------------------------------------------------------------
🔹 PURPOSE:
This command creates a **new custom Docker network** named `milkyway`.

By default, it uses the **bridge driver**, meaning it behaves like Docker’s 
default "bridge" network but is **user-defined** — giving you more control.

---------------------------------------------------------------
🧠 WHAT HAPPENS WHEN YOU RUN IT:
1️⃣ Docker creates a new **virtual network** (like a private Wi-Fi).
2️⃣ It assigns a new **subnet range** (like 172.18.0.0/16).
3️⃣ Any container you attach to this network will:
    - Get a **unique IP** in this range.
    - Be able to **communicate** with other containers on `milkyway`.
    - Be **isolated** from containers in other networks (like default bridge).

---------------------------------------------------------------
📘 EXAMPLE:
# Create network
docker network create milkyway

# Verify creation
docker network ls

Output:
NETWORK ID     NAME        DRIVER    SCOPE
91a9d516e6f4   bridge      bridge    local
e85bd9f99dc8   host        host      local
08a1cc940ca3   none        null      local
a7d9bb77ea45   milkyway    bridge    local   ✅ <— new custom network

---------------------------------------------------------------
🧩 HOW TO USE IT:
# Run a container in the 'milkyway' network
docker run -dit --name earth --network milkyway busybox

# Run another container in same network
docker run -dit --name mars --network milkyway busybox

→ Now both containers (earth & mars) can talk to each other
   using their **container names** (DNS-based communication).

Example inside a container:
   ping mars   ✅ works
   ping busybox-container ❌ won’t work (different network)

---------------------------------------------------------------
💬 IN SIMPLE WORDS:
- You just created a **private local network** inside Docker called `milkyway`.
- Containers you attach to it can **talk to each other**, but not with others outside.
- It’s like creating a **separate Wi-Fi network** only for a few containers.

---------------------------------------------------------------
💡 TIP:
To see detailed info about it:
   docker network inspect milkyway
--------------------------------------------------------------- */

/* ------------------------------------------------------------
🧩 docker run -itd --rm --network=milkyway --name=spider-man busybox

⚙️ COMMAND BREAKDOWN:
- `docker run` → Starts a new Docker container.
- `-i` → Keeps STDIN open (interactive mode).
- `-t` → Allocates a terminal for formatted output.
- `-d` → Runs the container in detached mode (in background).
- `--rm` → Automatically removes the container once it stops, 
           keeping your system clean.
- `--network=milkyway` → Connects this container to the 
                         custom Docker network named "milkyway".
- `--name=spider-man` → Assigns the container a custom name 
                        ("spider-man") instead of a random one.
- `busybox` → The lightweight Linux image used to run the container.

🧠 WHAT HAPPENS:
→ A new container named "spider-man" is created from the BusyBox image.  
→ It connects to the "milkyway" bridge network.  
→ Runs in the background and removes itself automatically when stopped.  

🎯 USE CASE:
Useful for creating quick, temporary containers to test 
network connections or commands between multiple containers 
in the same custom network (like "milkyway").
------------------------------------------------------------ */

/* 
############################################################
# 🌐 USER-DEFINED NETWORK IN DOCKER
############################################################

# 🧱 Command Example:
#   docker network create milkyway
#
# → This creates a new custom (user-defined) network named "milkyway".
#   Containers attached to this network can easily communicate with each other
#   using their container names instead of IP addresses.

------------------------------------------------------------
# 🚀 WHY USE A USER-DEFINED NETWORK?
------------------------------------------------------------

🔹 1️⃣ Container Name Resolution (DNS)
#   - Containers can talk using names instead of IPs.
#   - ✅ No need to use or remember the IP address of other containers.
#   - Example:
#       docker run -dit --network=milkyway --name=spider-man busybox
#       docker run -dit --network=milkyway --name=iron-man busybox
#     Inside 'spider-man':
#       ping iron-man     ✅ Works (automatic name resolution)

------------------------------------------------------------
🔹 2️⃣ Better Network Isolation
#   - Containers on different networks can’t access each other.
#   - Keeps environments separate (e.g., frontend vs backend).

------------------------------------------------------------
🔹 3️⃣ Custom Configuration
#   - You can define your own subnet, gateway, and IP range.
#   - Example:
#       docker network create --subnet=192.168.10.0/24 my_custom_net

------------------------------------------------------------
🔹 4️⃣ Automatic DNS & Easier Linking
#   - No need for deprecated '--link'.
#   - Docker automatically manages DNS inside the custom network.

------------------------------------------------------------
🔹 5️⃣ Easier Maintenance
#   - Container names remain the same even if IPs change.
#   - Simplifies restarting and scaling containers.

------------------------------------------------------------
# 🧠 REAL-LIFE ANALOGY
#   - Default 'bridge' network → Public Wi-Fi at a café (everyone can join but must use IPs)
#   - User-defined network → Your home Wi-Fi (devices have names and connect securely)

------------------------------------------------------------
# ✅ SUMMARY TABLE
# ----------------------------------------------------------
# | Feature               | Default bridge | User-defined bridge |
# |------------------------|----------------|---------------------|
# | Name resolution        | ❌ Only by IP   | ✅ By container name |
# | Isolation              | ❌ Shared       | ✅ Isolated          |
# | Custom IP range        | ❌ No           | ✅ Yes               |
# | Ease of use            | ⚙️ Basic        | 🚀 Advanced          |
# | DNS support            | ❌ No           | ✅ Yes               |
# ----------------------------------------------------------

############################################################
# 🧾 In simple words:
# User-defined networks make containers communicate easily,
# securely, and predictably — just like devices on your home Wi-Fi.
# They can connect to each other directly by name, without using IPs.
############################################################
*/

/*
############################################################
# 🔗 DOCKER NETWORK CONNECT COMMAND EXPLANATION
############################################################

# 🧱 Command:
#   docker network connect milkyway my-container2
#
# → This command connects an existing container (`my-container2`)
#   to an existing Docker network (`milkyway`).

------------------------------------------------------------
# 🧩 BREAKDOWN:
# 🔹 docker network connect
#     → Used to attach a running container to a network.

# 🔹 milkyway
#     → The name of the user-defined network you created earlier.
#       Example: docker network create milkyway

# 🔹 my-container2
#     → The name of the existing container that you want to connect
#       to the "milkyway" network.

------------------------------------------------------------
# 🧠 WHAT IT DOES:
#   - Connects the container `my-container2` to the `milkyway` network.
#   - After this, the container can communicate with other containers
#     on the same network (like `spider-man`) using their **container names**.
#   - The container now has access to multiple networks if it was already
#     part of another one (e.g., the default `bridge` network).

------------------------------------------------------------
# 🧾 IN SIMPLE WORDS:
#   You’re plugging `my-container2` into the “milkyway” Wi-Fi,
#   so it can talk with all other containers in that network
#   — no need to use IP addresses!

------------------------------------------------------------
# 🧪 EXAMPLE CHECK:
#   docker exec -it my-container2 ping spider-man
#   ✅ If both are in the same network, this will work.

------------------------------------------------------------
# 💡 TIP:
#   - To disconnect it later:
#       docker network disconnect milkyway my-container2
#   - To see which networks a container is connected to:
#       docker inspect my-container2 | grep -i networks
############################################################
*/

/*
############################################################
# 🔌 DOCKER NETWORK DISCONNECT COMMAND
############################################################

# 🧱 Command:
#   docker network disconnect milkyway dr
#
# → This command disconnects a container named "dr"
#   from the Docker network named "milkyway".

------------------------------------------------------------
# 🧩 BREAKDOWN:
# 🔹 docker network disconnect
#     → Tells Docker to detach (unplug) a container from a network.

# 🔹 milkyway
#     → The name of the user-defined network you created earlier
#       using: docker network create milkyway

# 🔹 dr
#     → The name (or ID) of the container you want to remove
#       from the "milkyway" network.

------------------------------------------------------------
# 🧠 WHAT HAPPENS INTERNALLY:
#   - Docker removes the network interface that connected
#     the container `dr` to the `milkyway` network.
#   - The container will no longer communicate with any containers
#     that are part of the `milkyway` network.
#   - The container itself keeps running (it is *not stopped*).

------------------------------------------------------------
# 🧾 IN SIMPLE WORDS:
#   You are “unplugging” the container `dr` from the `milkyway` Wi-Fi.
#   It will lose connection with all containers on that network.

------------------------------------------------------------
# 🧪 EXAMPLE:
#   docker exec -it dr ping spider-man
#   ❌ This will fail after disconnecting, since they’re no longer
#      on the same network.

------------------------------------------------------------
# 💡 TIP:
#   - To reconnect it again:
#       docker network connect milkyway dr
#   - To verify which networks a container is connected to:
#       docker inspect dr | grep -i networks

############################################################
# 🧾 Summary:
#   The `docker network disconnect` command removes a container
#   from a specific network — just like disconnecting a device
#   from a Wi-Fi network.
############################################################
*/

/* ------------------------------------------------------------
🧩 docker system df

# 📦 Purpose:
#   Shows the disk space usage by Docker components.

# 📊 Displays:
#   - Images: Docker images and how much space they use.
#   - Containers: Space used by running and stopped containers.
#   - Local Volumes: Storage used by named and anonymous volumes.
#   - Build Cache: Space used by intermediate image layers.

# ⚙️ Useful For:
#   - Checking how much space Docker is consuming on your system.
#   - Identifying what you can clean up to free disk space.

# 🧹 Tip:
#   You can clean unused data with →  docker system prune
#   (Be careful — it removes all unused containers, networks, and images.)
------------------------------------------------------------ */

/* ------------------------------------------------------------
🧹 docker system prune -a --volumes -f

# 📦 Purpose:
#   Cleans up your entire Docker environment by removing all unused data.

# 🧾 What It Removes:
#   - 🔹 Stopped containers
#   - 🔹 Unused images (both dangling & unreferenced)
#   - 🔹 Unused networks
#   - 🔹 Unused volumes (because of the --volumes flag)
#   - 🔹 Build cache

# ⚙️ Flags Explanation:
#   -a          → Remove all unused images, not just dangling ones.
#   --volumes   → Also remove unused volumes (extra cleanup).
#   -f          → Force removal without asking for confirmation.

# ⚠️ Warning:
#   This will permanently delete data that’s not actively used.
#   Use it only if you’re sure you don’t need old images or containers.

# 💡 Tip:
#   Run `docker system df` before this command to see what’s taking up space.
------------------------------------------------------------ */

/* ------------------------------------------------------------
🧩 docker run -it --rm -v /mnt/c/Users/rinke/Desktop/docker-notes/testing:/home/ubuntu/rinkesh --name link-local-container ubuntu
------------------------------------------------------------
# 🧱 Purpose:
#   Runs a temporary Ubuntu container and mounts a folder from your
#   local machine into the container — allowing you to share files
#   between your computer and the container.

# 🧠 Breakdown:
#   • docker run
#       → Creates and starts a new container.
#
#   • -it
#       → Interactive mode with a terminal so you can type commands inside.
#
#   • --rm
#       → Automatically removes the container when it stops (no leftovers).
#
#   • -v /mnt/c/Users/rinke/Desktop/docker-notes/testing:/home/ubuntu/rinkesh
#       → Mounts (binds) a local folder into the container.
#         Left side (before colon): local path on your computer.
#         Right side (after colon): path inside the container.
#         Any file created in one place will appear in the other.
#
#   • --name link-local-container
#       → Assigns a readable name to the container for easy reference.
#
#   • ubuntu
#       → Uses the official Ubuntu image as the container OS.

# 🧾 Example:
#   Any file you save in:
#       /mnt/c/Users/rinke/Desktop/docker-notes/testing
#   will be accessible inside the container at:
#       /home/ubuntu/rinkesh

# ✅ Tip:
#   Use this method to share project files, logs, or code
#   between your host system and the container.
------------------------------------------------------------ */

/* ------------------------------------------------------------
🧩 docker run -it \
      --rm \
      --name my-container \
      ubuntu

# 🧠 Notes:
# - The backslash "\" is called a *line continuation character*.
# - It tells the shell that the command continues on the next line.
# - This is only for better readability — it doesn’t change how the command works.
# - Without "\", you would have to write everything in one long line.
#
# Example (same command in single line):
#   docker run -it --rm --name my-container ubuntu
#
# ✅ Use "\" when a command has many options or arguments.
# ✅ It helps organize complex Docker commands neatly and makes them easier to read.
------------------------------------------------------------ */

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

/* ------------------------------------------------------------
🧩 docker volume create custom_data

🔹 Purpose:
   - Creates a new Docker volume named "custom_data".
   - A volume is a persistent data storage managed by Docker.

💡 Key Points:
   - Volumes store data **outside** of the container’s filesystem.
   - Data in a volume remains safe even if the container is removed.
   - Can be **shared** between multiple containers.
   - Helps in persisting logs, databases, or user-uploaded files.

📦 Example:
   docker run -it --rm -v custom_data:/app/data ubuntu

   → Mounts the volume "custom_data" to /app/data inside the container.

🧠 Think of it like:
   - A **USB drive** that containers can plug into to save or share data.

------------------------------------------------------------ */

/* 
######################################################################
# 🧱 DOCKER VOLUME MOUNT COMMAND EXPLANATION
#
# Command:
#   docker run -it --rm -v custom_data:/server ubuntu
#
# 🔹 docker run
#     → Runs a new Docker container.
#
# 🔹 -it
#     → Opens the container in interactive terminal mode.
#
# 🔹 --rm
#     → Automatically removes the container when you exit it,
#       keeping your system clean (no leftover containers).
#
# 🔹 -v custom_data:/server
#     → Mounts (connects) a Docker volume named "custom_data"
#       to the folder "/server" inside the container.
#
# 💾 Meaning:
#   The folder "/server" inside the Ubuntu container is linked to
#   the "custom_data" volume outside the container.
#
# 📂 Anything you store inside "/server" stays permanently in the volume,
#   even after the container is deleted.
#
# 💡 Example:
#   echo "Hello Rinkesh" > /server/note.txt
#   → File is saved safely in the volume.
#
#   Next time you create a new container with the same volume,
#   you’ll still find "note.txt" inside /server.
#
# ✅ Summary:
#   This command creates a temporary Ubuntu container,
#   links it to a persistent data volume ("custom_data"),
#   and ensures your data inside "/server" survives
#   even after the container is removed.
######################################################################
*/

/* ------------------------------------------------------------
📘 Docker Volume Mounting Example — Same Volume, Different Paths
-------------------------------------------------------------

🧩 Step 1: Create a new volume named "custom_data"
→ This acts like a persistent folder on your system
→ Path (internally): /var/lib/docker/volumes/custom_data/_data/

Command:
docker volume create custom_data


🧩 Step 2: Run first container (Ubuntu)
→ Mount the volume to "/server" inside the container
→ Any file created in /server is saved inside the volume

Command:
docker run -it --rm -v custom_data:/server ubuntu

Example inside the container:
echo "Hello from Ubuntu" > /server/notes.txt
exit


🧩 Step 3: Run another container (BusyBox)
→ Attach the same volume but mount it at a different path "/server2"
→ Even though folder names differ (/server vs /server2),
  both point to the same underlying storage (custom_data)

Command:
docker run -it --rm -v custom_data:/server2 busybox

Example inside the container:
ls /server2           → You'll still see "notes.txt"
cat /server2/notes.txt → Outputs: Hello from Ubuntu


🧠 Concept Summary:
- Volume = shared, persistent storage managed by Docker
- /server and /server2 are just container paths (mount points)
- Both connect to the same volume, so data stays the same
- Even if containers are deleted, volume data remains
------------------------------------------------------------- */

/*  Docker compose start here  */

/* ------------------------------------------------------------
📘 Docker Compose Command — `docker compose up`
------------------------------------------------------------- */

/* 🧩 Command:
   docker compose up
*/

/* 🧠 Explanation:
   → Reads the `docker-compose.yml` file in the current directory.
   → Builds and starts all services (containers) defined in it.
   → Automatically creates networks, volumes, and dependencies if required.
   → If an image doesn’t exist locally, Docker will pull it from Docker Hub.
*/

/* ⚙️ Common Options:
   - `-d` → Run containers in the background (detached mode)
        📌 Example: docker compose up -d
   - `--build` → Rebuild images before starting containers
        📌 Example: docker compose up --build
   - `--force-recreate` → Recreate containers even if nothing changed
        📌 Example: docker compose up --force-recreate
*/

/* 📦 Example Usage:
   # Start all services defined in docker-compose.yml
   docker compose up

   # Start in background mode
   docker compose up -d

   # Stop and remove all containers created by docker compose
   docker compose down
*/

/* 🧩 Summary:
   - `docker compose up` = run everything defined in docker-compose.yml
   - It’s like running multiple `docker run` commands automatically
   - Simplifies multi-container app management
------------------------------------------------------------- */

/* ------------------------------------------------------------
🧩 Command: docker volume ls | grep post
---------------------------------------------------------------
🔹 `docker volume ls` → Lists all available Docker volumes.
🔹 `|` (Pipe) → Passes the list output to the next command.
🔹 `grep post` → Searches for and filters only the lines that contain
   the word **"post"** (the filter keyword).

💡 In short:
"post" acts as a **filter keyword**, helping you quickly find
volumes whose names contain the word "post" (e.g., postgres_data).

------------------------------------------------------------ */

/*

# ------------------------------------------------------------
# 🐳 Docker Compose — Common Commands & Their Uses
# ------------------------------------------------------------

# 🚀 Start containers (show logs in terminal)
# docker compose up
# → Builds (if needed) and starts all containers defined in docker-compose.yml.
# → Displays container logs live in the terminal.
# → Stop it anytime with Ctrl + C.

# 🚀 Start containers in background (detached mode)
# docker compose up -d
# → Same as above, but runs containers in the background.
# → You can continue using the terminal while containers run.

# 🔄 Rebuild and restart containers
# docker compose up --build
# → Rebuilds images only if Dockerfile or source code changed.
# → Keeps containers and data intact.

# 🔁 Force rebuild and recreate all containers
# docker compose up --build --force-recreate
# → Rebuilds images AND recreates all containers from scratch.
# → Useful when environment variables or configurations change.

# 🧱 Stop and remove all containers, networks, and volumes
# docker compose down --volumes
# → Completely cleans up your setup (including DB or cache data).

# 🧩 View all running containers for this project
# docker compose ps
# → Lists container names, ports, and current status.

# 📜 View logs of all services (useful for debugging)
# docker compose logs
# → Displays logs from all containers.

# 📜 View logs for a specific service (example: backend)
# docker compose logs backend
# → Shows logs only from the 'backend' container.

# 🧰 Restart specific service
# docker compose restart backend
# → Restarts only the 'backend' container without affecting others.

# ------------------------------------------------------------
# 💡 Common Workflow Examples
# ------------------------------------------------------------
# ▶️ Start services (fresh build if needed)
# docker compose up --build -d

# 🧹 Stop everything and clean old data
# docker compose down --volumes

# 🪄 Full clean rebuild (complete reset)
# docker compose down --volumes && docker compose up --build -d
# ------------------------------------------------------------

*/

/*  Docker compose end here  */

/*  Docker Orchestration Start Here  */


/* ------------------------------------------------------------
 🧱 Passing env variable while creating image
 ------------------------------------------------------------
# 🧩 Use this command to build the Docker image with all env vars

docker build \
  --build-arg VITE_SERVER_URL="http://localhost:4000" \
  --build-arg VITE_RAZORPAY_KEY_ID="rzp_test_123456" \
  --build-arg VITE_GA_ID="G-123ABC" \
  --build-arg VITE_GTM_ID="GTM-XYZ123" \
  --build-arg VITE_CLIENT_SECRET="secret_456xyz" \
  -t my-vue-app .

# 📦 Explanation:
# --build-arg → passes environment variables at build-time
# -t my-vue-app → names the built image
# . → means build context is the current directory
------------------------------------------------------------ */




/*
############################################################
# 🐳 DOCKER BUILD WITH .ENV-STAGE FILE
############################################################

# 🧱 Command:
#   docker build $(grep -v '^#' .env-stage | xargs -I {} echo --build-arg {}) -t my-vite-app .
#
# → This command builds a Docker image named `my-vite-app` 
#   using build-time arguments from a `.env-stage` file.

------------------------------------------------------------
# 🧩 BREAKDOWN:
# 🔹 docker build
#     → Command to build a Docker image from a Dockerfile.
#
# 🔹 $(grep -v '^#' .env-stage | xargs -I {} echo --build-arg {})
#     → Reads all non-comment lines from `.env-stage`.
#     → Prepends `--build-arg` to each line so Docker receives them as build arguments.
#     → Example: VITE_SERVER_URL=https://stage.example.com becomes
#       --build-arg VITE_SERVER_URL=https://stage.example.com
#
# 🔹 -t my-vite-app
#     → Tags the image with the name `my-vite-app`.
#
# 🔹 .
#     → The build context (current directory), which includes your Dockerfile and app files.

------------------------------------------------------------
# 🧠 WHAT IT DOES:
#   - Passes all environment variables in `.env-stage` as build arguments.
#   - Docker matches each `--build-arg` to the corresponding `ARG` in the Dockerfile.
#   - Variables are available at **build-time** inside the Dockerfile.
#   - Order of variables in `.env-stage` does NOT matter; matching is by name.

------------------------------------------------------------
# 🧾 IN SIMPLE WORDS:
#   You’re giving Docker all your build-time environment variables
#   from a file, so you don’t have to manually type each `--build-arg`.

------------------------------------------------------------
# 💡 TIP:
#   - Lines starting with `#` in `.env-stage` are ignored.
#   - Extra variables in `.env-stage` not declared as `ARG` in Dockerfile are ignored.
#   - If you want the variables to persist in the container, also use `ENV` in Dockerfile.
############################################################
*/

/*
############################################################
# 🐳 DOCKER RUN WITH ENV-FILE
############################################################

# 🧱 Command:
#   docker run -it --env-file ./.env.stage my-vite-app
#
# → This command runs a container from the `my-vite-app` image,
#   loading environment variables from the `.env.stage` file.

------------------------------------------------------------
# 🧩 BREAKDOWN:
# 🔹 docker run
#     → Command to create and start a Docker container.
#
# 🔹 -it
#     → -i → Interactive mode: keeps STDIN open.
#     → -t → Allocates a TTY (terminal) for interactive use.
#
# 🔹 --env-file ./.env.stage
#     → Loads all environment variables from `.env.stage` into the container.
#     → Example: VITE_SERVER_URL=https://stage.example.com
#
# 🔹 my-vite-app
#     → The name of the Docker image to run.

------------------------------------------------------------
# 🧠 WHAT IT DOES:
#   - Starts a container interactively.
#   - Makes all variables from `.env.stage` available **at runtime**.
#   - No need to manually set `-e VAR=value` for each variable.

------------------------------------------------------------
# 🧾 IN SIMPLE WORDS:
#   You’re giving your running container all the environment variables
#   from a file, so your app has the correct configuration without manual typing.

------------------------------------------------------------
# 💡 TIP:
#   - To detach the container and run in background:
#       docker run -d --env-file ./.env.stage my-vite-app
#   - To override a variable at runtime:
#       docker run -it -e VITE_SERVER_URL=https://override.com --env-file ./.env.stage my-vite-app
############################################################
*/




/*
############################################################
# 🐳 CHECK ENVIRONMENT VARIABLES IN DOCKER CONTAINER
############################################################

------------------------------------------------------------
# 🧱 Commands:

# 1️⃣ List all environment variables inside a running container:
#   docker exec -it <container_name_or_id> env

# 2️⃣ List all environment variables (or a specific one) inside a container:
#   docker exec -it <container_name_or_id> printenv
#   Example: printenv VITE_SERVER_URL

------------------------------------------------------------
# 🧩 BREAKDOWN:

# 🔹 docker exec
#     → Run a command in a running container.

# 🔹 -it
#     → -i → Keep STDIN open (interactive mode)
#     → -t → Allocate a TTY (terminal), so output is readable

# 🔹 <container_name_or_id>
#     → Replace with your container's name or ID (check using `docker ps`)

# 🔹 env
#     → Prints all environment variables inside the container.

# 🔹 printenv
#     → Prints all environment variables.
#     → If a variable name is provided, prints only that variable's value.

------------------------------------------------------------
# 🧠 WHAT IT DOES:

# - Both commands allow you to inspect environment variables of a running container.
# - `env` is also useful for temporarily running commands with modified variables.
# - `printenv` is simpler if you want to **check a specific variable**.

------------------------------------------------------------
# 🧾 IN SIMPLE WORDS:

#   You're opening the container and asking it:
#   "Hey, tell me all the variables you know about!" 
#   or "Give me the value of this one variable."

------------------------------------------------------------
# 💡 TIP:

# - To see container names/IDs:
#     docker ps
# - To check a specific variable:
#     docker exec -it <container_name_or_id> printenv VITE_SERVER_URL
# - For interactive shell access (and more checks):
#     docker exec -it <container_name_or_id> /bin/sh
############################################################
*/





/*
docker exec -it <container_name> /bin/sh
--------------------------------------
- Used to enter inside a running Docker container
- Allows executing commands inside the container
- Useful for debugging and inspecting container state
- Does NOT create a new container, uses an existing one
- Container must be in running state
- -i keeps the terminal interactive
- -t allocates a pseudo terminal (TTY)
- /bin/sh starts a shell inside the container
- Commonly used when /bin/bash is not available
- Changes made inside container are temporary unless volumes are used
*/


// ============================================================
// End of Docker Notes
// ============================================================





/*
CMD vs RUN in Dockerfile

RUN:
- Executes during the Docker image build process.
- Used to install packages, dependencies, and configure the environment.
- Creates a new layer in the Docker image.
- Runs only once when the image is built.

CMD:
- Specifies the default command to run when a container starts.
- Executes every time the container runs.
- Used to start the main application inside the container.
- Only the last CMD instruction in a Dockerfile is used.

Example:

RUN npm install        -> runs during docker build
CMD ["node","app.js"]  -> runs when docker run is executed
*/






/*
docker attach <container-id>

This command connects your terminal to a running Docker container.

It attaches your terminal to the container's standard input,
standard output, and error streams so you can see the live logs
or interact with the running process inside the container.

Example:
docker attach a1b2c3d4e5

Important:
- You will see the live output of the container.
- If you press CTRL + C while attached, the container may stop
  because it sends an interrupt signal to the main process.

To safely detach from the container without stopping it:
Press CTRL + P then CTRL + Q.
*/







