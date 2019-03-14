This utility is responsible for building/bundling code from packages so that it can be
loaded inside our website as examples etc. It spawns webpack using a config provided by the consumer,
which allows us to support packages that use custom build configurations.