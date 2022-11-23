#!/bin/sh

# The first parameter provides the path to the data source file
# If the path does not need to be received when executing the script file,
# substitute a string to the value of the corresponding variable.
DataSourcePath=$1

yarn run typeorm --dataSource=${DataSourcePath} migration:run
