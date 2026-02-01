# Canvas LMS Helm chart

> [!IMPORTANT]
> I've decided to archive this repo as I'm no longer actively interested in maintaining it. The code is still available for reference and you're welcome to fork it if you'd like to continue development.

> [!WARNING]
>  Please note that I make no claim about production-readiness of this; use at your own risk.

❕ **Trademarks**: all trademarks are owned by the respective companies, and the use of them does not imply any affiliation or endorsement.

This is [Canvas LMS](https://github.com/instructure/canvas-lms) packaged as a batteries-included Helm chart.

This project was inspired by [this repo](https://github.com/instructure/canvas-self-hosted), only it's meant for use with Kubernetes/Helm, not with Docker Compose.

# Quickstart

With your target cluster and namespace as your current context, run:

```bash
helm upgrade -i canvas oci://registry-1.docker.io/ulevitsky/canvas-lms
kubectl port-forward svc/canvas-lms 3000:80
```

then try accessing `http://localhost:3000` in your browser. Please be patient because it might take Canvas a while to pull images, initialise, and start.

Once it's up and running and the log in page is showing, log in as `me@example.com` with `password`.

# Deployment

For real-life use, the process is similar to what's described in [Quickstart](#quickstart), only you will probably want to override some default values.

For a complete list of values, run

```bash
helm show values oci://registry-1.docker.io/ulevitsky/canvas-lms
```

If your installation is to be internet-facing, you will also need to BYO ingress and configure TLS.

# Local development

The supplied dev configuration, somewhat opnionatedly but mainly for convenience, presumes the use of [Tilt](https://tilt.dev), [ctlptl](https://github.com/tilt-dev/ctlptl), and [minikube](https://minikube.sigs.k8s.io/), and the included ctlptl spec is configured for Docker runtime to take advantage of in-cluster builds, without a local registry.

## Set up

1. [Install Tilt](https://docs.tilt.dev/).
2. [Install minikube](https://minikube.sigs.k8s.io/docs/) and all its dependencies.
3. [Install ctlptl](https://github.com/tilt-dev/ctlptl).
4. Clone this repo.
5.

```bash
cd canvas-lms-helm
git submodule update --init --recursive
ctlptl -f ctlptl-cluster-spec.yaml apply
```

## Configure

Create file `values.override.yaml`. It can be left empty.

## Run

1. In your terminal, from within the repo's directory, `tilt up`.
2. Open [http://localhost:10350/](http://localhost:10350/) in your browser and watch the status of the build/rollout. Note that the initial build of Canvas LMS image can take quite a while.
3. Once everything turned green, you can access Canvas at [http://localhost:3000/](http://localhost:3000/).
4. Look up log in credentials in your `values.yaml`.

# Build

## Canvas LMS
To pull the latest Canvas LMS code, run:

```bash
cd canvas-lms
git fetch
git checkout release/<latest-tag>
cd -
git submodule update --init --recursive
```

To build and push image from latest Canvas LMS source, run:

```bash
./scripts/build-push-image-lms.sh
```
