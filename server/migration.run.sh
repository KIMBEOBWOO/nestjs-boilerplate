#!/bin/sh

# The first parameter should provide an environment to which migration will be applied.
# Select dev, production.
Environment=$1

# The Second parameter provides the path to the data source file
# If the path does not need to be received when executing the script file,
# substitute a string to the value of the corresponding variable.
DataSourcePath=$2

yarn run typeorm:${Environment} --dataSource=${DataSourcePath} migration:run
