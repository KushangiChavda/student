# List of user defined repos that should be cloned.
# cat -e -t -v Makefile

# List of tools that must be installed.
# A simple check to determine the tool is available. No version check, etc.
define REQUIRED_SOFTWARE
docker \
docker-compose \
git \
node \
yarn
endef

# Defined here are the subprojects in a comma-separated format
# GIT_REPO_URL,SUBDIR_NAME,TAG
# GIT_REPO_URL is the URL of the git repository
# SUBDIR_NAME is just the directory name itself
# TAG is the git tag or branch to checkout
# Projects will be started in this order
define SUBPROJECT_REPOS
auth-service \
example-service \
web-service
endef