#gnu makefile
# This Makefile provides macro control of the Reaction Platform microservice
# ecosystem. It performs tasks like:
#
#   * Verify dependencies are present
#   * Clone git projects, checkout a particular reference
#   * Preconfiguration and subproject bootstrapping
#   * Launching subprojects
#   * Teardown tasks with varying destructiveness
#
#
# Exit codes:
#
#   All failures should exit with a detailed code that can be used for
#   troubleshooting. The current exit codes are:
#
#     0: Success!
#   101: Github is not configured correctly.
#   102: Required dependency is not installed.
#

###############################################################################
### Common Configuration
###############################################################################
HOOK_DIR=.reaction/project-hooks

###############################################################################
### Loaded Configuration
### Load configuration from external files. Configuration variables defined in
### later files have precedent and will overwrite those defined in previous
### files. The -include directive ensures that no error is thrown if a file is
### not found, which is the case if config.local.mk does not exist.
###############################################################################
-include config.mk config.local.mk

SUBPROJECTS=$(foreach rr,$(SUBPROJECT_REPOS),$(shell echo $(rr)))


###############################################################################
### Tasks
###############################################################################
all: init

###############################################################################
### Init-Project
### Initializes a project in production mode.
### Does not do common tasks shared between projects.
###############################################################################
define init-template
init-$(1): $(1) install-$(1)
endef
$(foreach p,$(SUBPROJECTS),$(eval $(call init-template,$(p))))

.PHONY: init
init: $(foreach p,$(SUBPROJECTS),init-$(p)) 

###############################################################################
### Verify prerequisite software is installed.
###############################################################################
is-not-installed=! (command -v $(1) >/dev/null)

define dependency-template
dependency-$(1):
	@if ( $(call is-not-installed,$(1)) ); \
	then \
	  echo "Dependency" $(1) " not found in path." \
	  && exit 102; \
	else \
	  echo "Dependency" $(1) "found."; \
	fi;
endef
$(foreach pkg,$(REQUIRED_SOFTWARE),$(eval $(call dependency-template,$(pkg))))

.PHONY: dependencies
dependencies: $(foreach pkg,$(REQUIRED_SOFTWARE),dependency-$(pkg))

###############################################################################
### Start
### Starts services with `docker-compose up -d`
###############################################################################
define start-template
start-$(1):
	@cd $(1) && npm start
endef
$(foreach p,$(SUBPROJECTS),$(eval $(call start-template,$(p))))

.PHONY: start
start: $(foreach p,$(SUBPROJECTS),start-$(p))

###############################################################################
### Install
### installs modules with `npm install`
###############################################################################
define install-template
install-$(1):
	@cd $(1) && npm install
endef
$(foreach p,$(SUBPROJECTS),$(eval $(call install-template,$(p))))

.PHONY: install
install: $(foreach p,$(SUBPROJECTS),start-$(p))

###############################################################################
### Show
### Shows service name with `echo`
###############################################################################
define show-template
show-$(1):
	echo "Working on $(1)"
endef
$(foreach p,$(SUBPROJECTS),$(eval $(call show-template,$(p))))

.SILENT: show
show: $(foreach p,$(SUBPROJECTS),show-$(p))

###############################################################################
### Dynamically list all targets.
### See: https://stackoverflow.com/a/26339924
###############################################################################
.PHONY: list
list:
	@$(MAKE) -pRrq -f $(MAKEFILE_LIST) : 2>/dev/null | awk -v RS= -F: '/^# File/,/^# Finished Make data base/ {if ($$1 !~ "^[#.]") {print $$1}}' | sort | egrep -v -e '^[^[:alnum:]]' -e '^$@$$' | xargs -n 1	