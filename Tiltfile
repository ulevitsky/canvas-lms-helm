allow_k8s_contexts(k8s_context())
analytics_settings(enable=False)

def create_namespace_if_not_exists(namespace):
    exists = local("kubectl get namespace " + namespace + " --ignore-not-found")

    if not exists:
        local("kubectl create namespace " + namespace)


print("Running against " + k8s_context() + " cluster")
expected_cluster_name = "canvaslms-dev"

if not k8s_context().startswith(expected_cluster_name):
    fail("Only permitted to run against " + expected_cluster_name + "* cluster. Aborting.")

namespace = "canvas"
release_name = "canvas"

yaml = helm(
    "./chart",
    name=release_name,
    namespace=namespace,
    values=["./chart/values.override.yaml"]
)

create_namespace_if_not_exists(namespace)

docker_build(
    ref="ulevitsky/canvas-lms",
    dockerfile="./canvas-lms/Dockerfile.production",
    context="./canvas-lms",
    ignore=["./canvas-lms/config"],
)

watch_file("./dev-overrides")

docker_build(
    ref="ulevitsky/canvas-rce-api",
    dockerfile="./canvas-rce-api/Dockerfile",
    context="./canvas-rce-api",
)

k8s_yaml(yaml)

k8s_resource(
    workload="canvas-lms",
    port_forwards="3000:80",
)

k8s_resource(
    workload="canvas-lms-rce",
    port_forwards="3001:80",
)

k8s_resource(
    workload="postgresql",
    port_forwards="3002:5432",
)
