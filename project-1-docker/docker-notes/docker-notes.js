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

















// ============================================================
// End of Docker Notes
// ============================================================
